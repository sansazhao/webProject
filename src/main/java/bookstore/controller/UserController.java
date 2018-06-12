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
@Controller
public class UserController {
    private String userName = "";

    @Autowired
    private UserService uService;

    @RequestMapping("/login")
     protected void doLogin(String name,String pwd,HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        out.print(uService.login(name,pwd));
        userName = name;
        System.out.println("login："+ name +"  pwd:"+ pwd);
    }

    @RequestMapping("/logout")
    protected void doLogout(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        userName = "";
        System.out.println("logout");
    }

    @RequestMapping("/regis")
    protected void doRegis(String name,String pwd,HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(">>>>>>>>>>doRegis<<<<<<<<<<<  name:"+name+" pwd:"+pwd);
        PrintWriter out = resp.getWriter();
        out.print(uService.regis(name,pwd));
        System.out.println("login："+ name +"  pwd:"+ pwd);
    }

    @RequestMapping("/auth")
    protected void doAuth(HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        out.print(userName);
    }
}
