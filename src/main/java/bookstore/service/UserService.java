package bookstore.service;

import bookstore.entity.User;
import java.util.List;

public interface UserService {
    String login(String name, String password);

    String regis(String name, String password) ;

    int findUserByUsername(String name);

    void stop(Integer uid);

    void recover(Integer uid);

    User create(User SUser);

    User update(User SUser);

    List<String> findAll();

    void addPicture(String name,String bin);

    String getPicture(String name);
}