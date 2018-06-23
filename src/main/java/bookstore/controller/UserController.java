package bookstore.controller;

import bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@CrossOrigin("http://localhost:3000")
@RestController
public class UserController {
    @Autowired
    private UserService uService;

    @RequestMapping("/login")
     protected void doLogin(String name,String pwd,HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        out.print(uService.login(name,pwd));
        System.out.println("login："+ name +"  pwd:"+ pwd);
    }

    @RequestMapping("/regis")
    protected void doRegis(String name,String pwd,HttpServletResponse resp) throws  IOException {
        PrintWriter out = resp.getWriter();
        out.print(uService.regis(name,pwd));
        System.out.println("login："+ name +"  pwd:"+ pwd);
    }

    @PostMapping("/pic")
    protected String Picture(@RequestParam("name") String name,
                             @RequestParam("bin") String bin){
        uService.addPicture(name,bin);
        return uService.getPicture(name);
    }

}
