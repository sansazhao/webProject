package bookstore.controller;

import bookstore.entity.Cart;
import bookstore.service.*;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;


@CrossOrigin("http://localhost:3000")
@Controller
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    private List<Cart> cartBook = new ArrayList<>();

    @RequestMapping("/delete")
    protected void deleteFromCart(String user, String book,
                                HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(">>>>>>>>>>doDelete()<<<<<<<<<<<" + book);
        cartService.delete(user,book);
        PrintWriter out = resp.getWriter();
        out.println(book);
    }

    @RequestMapping("/createOrder")
    protected void createOrder(String user,
                                HttpServletResponse resp) throws ServletException, IOException {
        int price = cartService.createOrder(user);
        PrintWriter out = resp.getWriter();
        out.println(price);
    }

    @RequestMapping("/preOrder")
    protected void preOrder(String user,
                               HttpServletResponse resp) throws ServletException, IOException {
        int price = cartService.previewOrder(user);
        PrintWriter out = resp.getWriter();
        out.println(price);
    }

    private JSONArray json_array = new JSONArray();

    @RequestMapping("/getBook")
    protected void GetBook(String name, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(">>>>>>>>>>doCartGETBOOK()<<<<<<<<<<<");
        PrintWriter out = resp.getWriter();
        cartBook = cartService.queryAllByUserName(name);
        buildJsonArr(cartBook);
        out.println(json_array.toString());
    }

    private void buildJsonArr(List<Cart> c) {
        json_array.clear();
        json_array.addAll(c);
    }
}
