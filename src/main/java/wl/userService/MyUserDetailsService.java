package wl.userService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import wl.SRole;
import wl.SUser;

import java.util.*;

@Service("userDetailsService")
public class MyUserDetailsService implements UserDetailsService {
    @Autowired  //数据库服务类
    private UserService suserService;//code7

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        SUser SUser = suserService.findUserByName(userName); //code8
        if (SUser == null) {
            throw new UsernameNotFoundException("UserName " + userName + " not found");
        }
        SecuritySUser securityUser = new SecuritySUser(SUser);
        List<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
        for(SRole SRole :securityUser.getSRoles()){
            authorities.add(new SimpleGrantedAuthority(SRole.getName()));
        }
        return new org.springframework.security.core.userdetails.User(SUser.getName()
                , SUser.getPassword(),authorities);
    }
}
