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
    @Autowired
    private BookService bService;


    private List<Cart> cartBook = new ArrayList<>();

    @RequestMapping("/select")
    protected void doSelect(String Book,String user,HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(">>>>>>>>>>doSelect()<<<<<<<<<<<" + Book);
        cartService.add(user, Book, 1);
        PrintWriter out = resp.getWriter();
        out.print(bService.queryByTitle(Book).getPrice());
    }

    @RequestMapping("/changeQuan")
    protected void changeBookQuantity(String user,String book,int q,HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(">>>>>>>>>>change quantity<<<<<<<<<<<" + book + q);
        cartService.add(user,book,q);
        PrintWriter out = resp.getWriter();
        cartBook = cartService.queryAllByUserName(user);
        buildJsonArr(cartBook);
        out.println(json_array.toString());
        System.out.println(json_array.toString());
    }

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
