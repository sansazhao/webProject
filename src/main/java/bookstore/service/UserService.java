package bookstore.service;

import bookstore.entity.User;
import java.util.List;

public interface UserService {
    String login(String name, String password);

    String regis(String name, String password) ;

    int findUserByUsername(String name);

    User create(User SUser);

    User update(User SUser);

    List<User> findAll();
}