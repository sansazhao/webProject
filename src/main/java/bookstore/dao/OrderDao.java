package bookstore.dao;

import bookstore.entity.Cart;
import bookstore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface OrderDao extends JpaRepository<Order, Integer> {

    @Transactional
    Order save(Order or);

    @Transactional
    int deleteOrderByOrderid(int id);




}
