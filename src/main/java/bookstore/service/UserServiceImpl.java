package bookstore.service;

import bookstore.dao.UserDao;
import bookstore.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userRepo;

    public String login(String name, String password) {
        List<User> u = userRepo.queryByUsernameAndPassword(name, password);
        if(u.size() > 0)
            return u.get(0).getRole();
        return "";
    }

    public String regis(String name, String password) {
        User u = new User();
        u.setId(userRepo.findAvaiId().get(0).getId()+1);
        u.setPassword(password);
        u.setUsername(name);
        u.setRole("user");
        userRepo.save(u);
        System.out.println(userRepo.queryByUsername("react1").get(0).getId());
        return "user";
    }

    public List<User> findUserByUsername(String name) {
        return userRepo.queryByUsername(name);
    }

    public User create(User SUser) {
        return userRepo.save(SUser);
    }

    public User update(User SUser) {
        return userRepo.save(SUser);
    }

    public List<User> findAll() {
        return userRepo.findAll();
    }
}