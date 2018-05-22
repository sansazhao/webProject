package wl.userService;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import wl.SRole;
import wl.SUser;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;

public class SecuritySUser extends SUser implements UserDetails {
    private static final long serialVersionUID = 1L;
    private Collection<SimpleGrantedAuthority> authorities;
    public SecuritySUser(SUser suser) {
        if (suser != null)
        {
            this.setId(suser.getId());
            this.setName(suser.getName());
            this.setPassword(suser.getPassword());
            this.setSRoles(suser.getSRoles());
            System.out.println(" Database check success:  username: "+suser.getName()+ "  password: "+ suser.getPassword());
        }
    }
    public SecuritySUser(SUser suser, Collection<SimpleGrantedAuthority> authority) {
        this.setId(suser.getId());
        this.setName(suser.getName());
        this.setPassword(suser.getPassword());
        this.setSRoles(suser.getSRoles());
        this.authorities = authority;
    }

    @Override
    public Collection<SimpleGrantedAuthority> getAuthorities() {
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
        Set<SRole> userSRoles = this.getSRoles();
        if (userSRoles != null)
        {
            for (SRole SRole : userSRoles) {
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority(SRole.getName());
                authorities.add(authority);
                System.out.println("auth:"+authority);
            }
        }
        return authorities;
    }

    @Override
    public String getPassword() {
        return super.getPassword();
    }

    @Override
    public String getUsername() {
        return super.getName();
    }

    @Override
    public Set<SRole> getSRoles() {
        return super.getSRoles();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}