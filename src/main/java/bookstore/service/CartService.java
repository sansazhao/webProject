package bookstore.service;

import bookstore.entity.Cart;

import java.util.List;


public interface CartService {

    void delete(String uid,String bid);

    Cart add(String username, String bookname,int quantity);

    Cart query(String username,String bookname);

    List<Cart> queryAllByUserName(String username);

    int createOrder(String username);

    int previewOrderPrice(String username);

    void clearCart(int userid);
}