package bookstore.controller;

import bookstore.entity.Cart;
import bookstore.entity.Order;
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
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService oService;
    @Autowired
    private BookService bService;
    @Autowired
    private CartService cartService;
    private List<Order> orderList;
    private JSONArray json_array = new JSONArray();

    @RequestMapping("/create")
    protected void createOrder(String user,
                               HttpServletResponse resp) throws ServletException, IOException {
        int price = cartService.createOrder(user);
        PrintWriter out = resp.getWriter();
        out.println(price);
    }


    @RequestMapping("/get")
    protected void getOrder(String name, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("getOrder------");
        PrintWriter out = resp.getWriter();
        buildJsonArr(oService.queryOrder(name));
        out.println(json_array.toString());
    }

    @RequestMapping("/getDetail")
    protected void getOrderDetail(String name,Integer index, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("getOrderDetail------"+name+index);
        PrintWriter out = resp.getWriter();
        buildJsonArr(oService.queryOrderDetail(name,index));
        out.println(json_array.toString());
        System.out.println(json_array.toString());
    }

    private void buildJsonArr(List c) {
        json_array.clear();
        json_array.addAll(c);
    }

}
