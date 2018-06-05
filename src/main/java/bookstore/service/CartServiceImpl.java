package bookstore.service;

import bookstore.dao.BookDao;
import bookstore.dao.UserDao;
import bookstore.entity.Book;
import bookstore.dao.CartDao;
import bookstore.entity.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartDao cartRepo;
    @Autowired
    private BookDao bookRepo;
    @Autowired
    private UserDao userRepo;

    public List<Cart> queryByUserid(int id) {

        return cartRepo.queryCartByUserid(id);
    }

    @Modifying
    @Transactional
    public void delete(String uname,String bookname){
        int uid = userRepo.queryByUsername(uname).get(0).getId();
        int bid = bookRepo.queryByTitle(bookname).get(0).getId();
        cartRepo.deleteCartByUseridAndBookid(uid,bid);
    }

    public Cart add(int id, Book b) {
        Cart c = new Cart();
        c.setBookid(b.getId());
        c.setBookname(b.getTitle());
        c.setBookprice(b.getPrice());
        c.setUserid(id);
        System.out.println(b.getPrice());
        return cartRepo.save(c);
    }

    public Cart query(String uname,String bname){
        System.out.println("uname: "+uname+"bname: "+bname);
        int uid = userRepo.queryByUsername(uname).get(0).getId();
        int bid = bookRepo.queryByTitle(bname).get(0).getId();
        System.out.println("uid:"+uid+"\nbid:"+bid);
        Cart c = cartRepo.queryCartByUseridAndBookid(uid,bid).get(0);
        System.out.println("bookname:"+c.getBookname());
        return c;
    }

    public List<Cart> queryAllByUserName(String uname){
        int uid = userRepo.queryByUsername(uname).get(0).getId();
        List<Cart> c = cartRepo.queryCartByUserid(uid);
        return c;
    }

    public int createOrder(String username){
        int uid = userRepo.queryByUsername(username).get(0).getId();
        int pri = 0;
        pri = cartRepo.calSumPrice(uid);
        System.out.println("sum price："+pri);
        return pri;
    }
}