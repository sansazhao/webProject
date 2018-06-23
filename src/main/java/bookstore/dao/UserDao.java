package bookstore.dao;

import bookstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserDao extends JpaRepository<User, Integer> {
    @Query("select u from User u where u.username=?1 and u.password=?2")
    User login(String name, String password);

    @Query("select u from User u where u.username=:username and u.password=:password")
    List<User> queryByUsernameAndPassword(@Param("username")String username,
                                                    @Param("password") String password);

    @Query("select u from User u where u.username=:username")
    List<User> queryByUsername(@Param("username")String username);

    List<User> queryById(@Param("id")int id);

    List<User> findAll();

    User save(User u);

    @Query("select u from User u where u.id >= all(select id from User)")
    List<User> findAvaiId();

}
