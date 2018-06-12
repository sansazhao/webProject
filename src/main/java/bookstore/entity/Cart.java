package bookstore.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "cart", schema = "test", catalog = "")
@IdClass(CartEntityPK.class)
public class Cart {
    private int userid;
    private int bookid;
    private int bookprice;
    private String bookname;

    public Cart(){}

    @Id
    @Column(name = "userid", nullable = false, length = 20)
    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    @Id
    @Column(name = "bookid", nullable = false, precision = 0)
    public int getBookid() {
        return bookid;
    }

    public void setBookid(int bookid) {
        this.bookid = bookid;
    }

    @Basic
    @Column(name = "bookprice", nullable = true)
    public Integer getBookprice() {
        return bookprice;
    }

    public void setBookprice(Integer bookprice) {
        this.bookprice = bookprice;
    }

    @Basic
    @Column(name = "bookname", nullable = true)
    public String getBookname() {
        return bookname;
    }

    public void setBookname(String bookname) {
        this.bookname = bookname;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cart that = (Cart) o;
        return bookid == that.bookid &&
                Objects.equals(userid, that.userid) &&
                Objects.equals(bookprice, that.bookprice);
    }

    @Override
    public int hashCode() {

        return Objects.hash(userid, bookid, bookprice);
    }
}
