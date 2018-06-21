package bookstore.service;

import bookstore.entity.Order;
import java.util.List;

public interface OrderService {

    List<Order> queryAllByUserName(String username);

    List<String> queryOrder(String username);

    List<String> queryOrderDetail(String username,int orderid);
}