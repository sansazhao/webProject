package bookstore.controller;

import bookstore.service.*;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService oService;

    private JSONArray json_array = new JSONArray();

    @RequestMapping("/get")
    protected JSONArray getOrder(String name, HttpServletResponse resp) throws IOException {
        return JSONArray.fromObject(oService.queryOrder(name));
    }

    @RequestMapping("/getDetail")
    protected JSONArray getOrderDetail(Integer orderid, HttpServletResponse resp) throws IOException {
        return JSONArray.fromObject(oService.queryOrderDetail(orderid));
    }

    @RequestMapping("/getTotal")
    protected JSONArray getTotal(HttpServletResponse resp) throws IOException {
        return JSONArray.fromObject(oService.queryTotalSale());
    }

    /*
    private void buildJsonArr(List c) {
        json_array.clear();
        json_array.addAll(c);
    }*/
}
