package bookstore.service;

import bookstore.dao.PictureDao;
import bookstore.dao.UserDao;
import bookstore.entity.Picture;
import bookstore.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonWriter;
import javax.json.JsonWriterFactory;
import javax.json.stream.JsonGenerator;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userRepo;
    @Autowired
    private PictureDao picRepo;

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

    public int findUserByUsername(String name) {
        return userRepo.queryByUsername(name).get(0).getId();
    }

    public User create(User SUser) {
        return userRepo.save(SUser);
    }

    public User update(User SUser) {
        return userRepo.save(SUser);
    }

    public List<String> findAll() {
        List<User> u = userRepo.findAll();
        List<String> modifiedU = new ArrayList<>();
        for (User usr: u){
            if(usr.getRole().equals("user"))
                modifiedU.add(buildJson(usr));
        }
        return modifiedU;
    }

    @Transactional
    public void stop(Integer uid){
        System.out.println("stop:"+uid);
        User u = userRepo.queryById(uid).get(0);
        System.out.println("stop:"+u.getUsername());
        u.setAvail(0);
        userRepo.save(u);
    }

    @Transactional
    public void recover(Integer uid){
        System.out.println("recover:"+uid);
        User u = userRepo.queryById(uid).get(0);

        u.setAvail(1);
        userRepo.save(u);
    }

    public void addPicture(String name,String bin){
        Picture p = new Picture();
        p.setStr(bin);
        p.setName(name);
        picRepo.insert(p);
        System.out.println("insert succ");
    }

    public String getPicture(String name){
        return picRepo.findByName(name).getStr();
    }

    private String buildJson(User u) {
        /* Build JSON Object Model */
        JsonObject model = Json.createObjectBuilder()
                .add("id", u.getId())
                .add("avail", u.getAvail())
                .build();

        /* Write JSON Output */
        StringWriter stWriter = new StringWriter();
        try (JsonWriter jsonWriter = Json.createWriter(stWriter)) {
            jsonWriter.writeObject(model);
        }
        /* Write formatted JSON Output */
        Map<String, String> config = new HashMap<>();
        config.put(JsonGenerator.PRETTY_PRINTING, "");
        JsonWriterFactory factory = Json.createWriterFactory(config);
        StringWriter stWriterF = new StringWriter();
        try (JsonWriter jsonWriterF = factory.createWriter(stWriterF)) {
            jsonWriterF.writeObject(model);
        }
        return model.toString();
    }
}