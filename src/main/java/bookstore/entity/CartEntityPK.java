package bookstore.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class CartEntityPK implements Serializable {
    private int userid;
    private int bookid;

    @Column(name = "userid", nullable = false, length = 20)
    @Id
    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    @Column(name = "bookid", nullable = false, precision = 0)
    @Id
    public int getBookid() {
        return bookid;
    }

    public void setBookid(int bookid) {
        this.bookid = bookid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartEntityPK that = (CartEntityPK) o;
        return bookid == that.bookid &&
                Objects.equals(userid, that.userid);
    }

    @Override
    public int hashCode() {

        return Objects.hash(userid, bookid);
    }
}
