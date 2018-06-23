package bookstore.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "tbl_user", schema = "test", catalog = "")
public class User {
    private int id;
    private String username;
    private String role;
    private String password;
    private int avail;
    
    @Id
    @Column(name = "id", nullable = false, precision = 0)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "username", nullable = true, length = 20)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "role", nullable = true, length = 20)
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Basic
    @Column(name = "password", nullable = true, length = 20)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "avail", nullable = false)
    public int getAvail() {
        return avail;
    }

    public void setAvail(int avail) {
        this.avail = avail;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User that = (User) o;
        return id == that.id &&
                Objects.equals(username, that.username) &&
                Objects.equals(role, that.role) &&
                Objects.equals(password, that.password) ;

    }

    @Override
    public int hashCode() {

        return Objects.hash(id, username, role, password);
    }
}
