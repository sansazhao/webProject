package wl;

import javax.persistence.*;
import java.util.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "s_user", catalog = "test")//code11
public class SUser implements java.io.Serializable {
//public class SUser implements UserDetails {
    private Long id;
    private String name;
    private String password;
    private Set<SRole> SRoles = new HashSet<SRole>(0);// Code12

    public SUser() {}

    public SUser(String name, String password, Set<SRole> SRoles) {
       this.name = name;
       this.password = password;
       this.SRoles = SRoles;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    public Long getId() {
       return this.id;
    }
    public void setId(Long id) {
       this.id = id;
    }

    @Column(name = "name", length = 20)
    public String getName() {
       return this.name;
    }
    public void setName(String name) {
       this.name = name;
    }


    @Column(name = "password", length = 200)
    public String getPassword() {
       return this.password;
    }
    public void setPassword(String password) {
       this.password = password;
    }

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "SUser")
    public Set<SRole> getSRoles() {
       return this.SRoles;
    }
    public void setSRoles(Set<SRole> SRoles) {
         this.SRoles = SRoles;
    }

}
