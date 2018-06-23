package bookstore.controller;

import bookstore.entity.Cart;
import bookstore.service.*;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    private List<Cart> cartBook = new ArrayList<>();

    @RequestMapping("/select")
    protected void doSelect(String Book,String user) {
        cartService.add(user, Book, 1);
    }

    @RequestMapping("/changeQuan")
    protected JSONArray changeBookQuantity(String user,String book,int q) {
        cartService.add(user,book,q);
        cartBook = cartService.queryAllByUserName(user);
        return JSONArray.fromObject(cartBook);
    }

    @RequestMapping("/delete")
    protected void deleteFromCart(String user, String book){
        cartService.delete(user,book);
    }

    @RequestMapping("/createOrder")
    protected int createOrder(String user){
        return cartService.createOrder(user);
    }

    @RequestMapping("/preOrder")
    protected int preOrder(String user) {
        return cartService.previewOrderPrice(user);
    }

    @RequestMapping("/getBook")
    protected JSONArray GetBook(String name) {
        cartBook = cartService.queryAllByUserName(name);
        return JSONArray.fromObject(cartBook);
    }
}
