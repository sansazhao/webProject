package bookstore.dao;

import bookstore.entity.Order;
import bookstore.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface OrderDetailDao extends JpaRepository<OrderDetail, Integer> {

    @Transactional
    OrderDetail save(OrderDetail or);

    @Query("select b from OrderDetail b where b.orderid=:orderid")
    List<OrderDetail> queryOrderByOrderid(@Param("orderid")int id);

}
