package bookstore.dao;

import bookstore.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CartDao extends JpaRepository<Cart, Integer> {

    Cart save(Cart c);

    @Transactional
    int deleteCartByBookid(int id);

    @Transactional
    int deleteCartByUserid(int id);
    
    @Transactional
    int deleteCartByUseridAndBookid(@Param("userid")int uid,@Param("bookid")int bid);

    @Query("select b from Cart b where b.userid=:userid")
    List<Cart> queryCartByUserid(@Param("userid")int id);

    @Query("select c from Cart c where c.userid =:userid and c.bookid =:bookid")
    List<Cart> queryCartByUseridAndBookid(@Param("userid")int uid,@Param("bookid")int bid);

    @Query("select sum(c.bookprice) from Cart c where c.userid =:userid")
    int calSumPrice(@Param("userid")int uid);

}
