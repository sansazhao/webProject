package bookstore.service;

import bookstore.dao.*;
import bookstore.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
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
    @Autowired
    private OrderDao orderRepo;
    @Autowired
    private OrderDetailDao orderDetailRepo;

    @Modifying
    @Transactional
    public void delete(String uname,String bookname){
        int uid = userRepo.queryByUsername(uname).get(0).getId();
        int bid = bookRepo.queryByTitle(bookname).get(0).getId();
        cartRepo.deleteCartByUseridAndBookid(uid,bid);
    }

    @Transactional
    public Cart add(String uname, String bname,int q) {
        System.out.println(uname+ bname+q);
        Book b = bookRepo.queryByTitle(bname).get(0);
        Cart c = new Cart();
        User u = userRepo.queryByUsername(uname).get(0);
        cartRepo.deleteCartByUseridAndBookid(u.getId(),b.getId());
        c.setBookid(b.getId());
        c.setBookname(b.getTitle());
        c.setBookprice(b.getPrice());
        c.setUserid(u.getId());
        c.setQuantity(q);
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

    @Transactional
    public int createOrder(String username){
        int uid = userRepo.queryByUsername(username).get(0).getId();
        int pri = 0;
        pri = cartRepo.calSumPrice(uid);
        System.out.println("create order--price：" + pri);
        Order o = new Order();
        o.setPrice(pri);
        o.setUserid(uid);
        o.setQuantity(cartRepo.calQuantity(uid));
        orderRepo.save(o);
        List<Cart> allCart = cartRepo.queryCartByUserid(uid);
        for(Cart c : allCart){
            OrderDetail od = new OrderDetail();
            od.setOrderid(o.getOrderid());
            od.setBookid(c.getBookid());
            od.setQuantity(c.getQuantity());
            orderDetailRepo.save(od);
        }
        clearCart(uid);
        return pri;
    }

    public int previewOrder(String username){
        int uid = userRepo.queryByUsername(username).get(0).getId();
        int pri = 0;
        pri = cartRepo.calSumPrice(uid);
        System.out.println("previewOrder--price："+pri);
        return pri;
    }

    @Transactional
    public void clearCart(int uid){
        cartRepo.deleteCartByUserid(uid);
    }
}