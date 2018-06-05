package bookstore.controller;

import bookstore.entity.Book;
import bookstore.entity.Cart;
import bookstore.service.*;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;


@CrossOrigin("http://localhost:3000")
@WebServlet
@Controller
@RequestMapping("/cart")
public class CartController extends HttpServlet {
    @Autowired
    private CartService cartService;

    private List<Cart> cartBook = new ArrayList<>();

    @RequestMapping("/add")
    protected void doAdd(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(">>>>>>>>>>doAdd()<<<<<<<<<<<");
        PrintWriter out = resp.getWriter();
        out.println("add to cart");
    }

    @RequestMapping("/delete")
    protected void doCartDelete(String user, String book,
                                HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(">>>>>>>>>>doDelete()<<<<<<<<<<<" + book);
        cartService.delete(user,book);
        PrintWriter out = resp.getWriter();
        out.println(book);
    }

    @RequestMapping("/createOrder")
    protected void doCartDelete(String user,
                                HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(">>>>>>>>>>CreateOrder<<<<<<<<<<<" + user);
        int price = cartService.createOrder(user);
        PrintWriter out = resp.getWriter();
        out.println(price);
    }

    private JSONArray json_array = new JSONArray();

    @RequestMapping("/getBook")
    protected void GetBook(String name, HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(">>>>>>>>>>doCartGETBOOK()<<<<<<<<<<<");
        PrintWriter out = resp.getWriter();
        cartBook = cartService.queryAllByUserName(name);
        buildJsonArr(cartBook);
        out.println(json_array.toString());
    }

    private void buildJsonArr(List<Cart> c) {
        json_array.clear();
        json_array.addAll(c);
        System.out.println("1:  " + json_array.toString());
    }
}
