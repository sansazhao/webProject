package bookstore.controller;

import bookstore.entity.Book;
import bookstore.service.BookService;
import bookstore.service.UserService;
import net.sf.json.JSONArray;
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
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserService uService;
    @Autowired
    private BookService bService;

    @RequestMapping("/modifyStock")
    protected JSONArray modifyStock(Integer bid,Integer newStock) {
        return JSONArray.fromObject(bService.modifyStock(bid,newStock));
    }

    @RequestMapping("/getAlluser")
    protected JSONArray getAlluser(){
        return JSONArray.fromObject(uService.findAll());
    }

    @RequestMapping("/stopUser")
    protected JSONArray StopUser(Integer uid){
        System.out.println("controller:"+uid);
        uService.stop(uid);
        return JSONArray.fromObject(uService.findAll());
    }

    @RequestMapping("/openUser")
    protected JSONArray openUser(Integer uid){
        uService.recover(uid);
        return JSONArray.fromObject(uService.findAll());
    }






}
