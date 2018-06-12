package bookstore.service;

import bookstore.entity.Book;
import bookstore.dao.CartDao;
import bookstore.entity.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface CartService {
    List<Cart> queryByUserid(int id);

    void delete(String uid,String bid);

    Cart add(int uid, Book b);

    Cart query(String username,String bookname);

    List<Cart> queryAllByUserName(String username);

    int createOrder(String username);
}