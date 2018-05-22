package wl.userService;

import wl.SUser;
import wl.repo.SUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private SUserRepository suserRepository;//code10

    public SUser findUserByName(String name) {
        return suserRepository.findUserByName(name);
    }
}
//public SUser create(SUser SUser) {
//    return suserRepository.save(SUser);
//}

//public SUser update(SUser SUser) {
//   return suserRepository.save(SUser);
//}

//public List<SUser> findAll() {
//return suserRepository.findAll();
//}

//  public SUser login(String name, String password) {
// return suserRepository.findByNameAndPassword(name, password);
// }

//public void deleteUser(int id) {
//  suserRepository.delete(id);
//}