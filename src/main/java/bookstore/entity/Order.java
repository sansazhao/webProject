package bookstore.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "book_order", schema = "test", catalog = "")
public class Order {
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    private int orderid;
    private int userid;
    private int price;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(insertable = false, updatable = false)
    private Timestamp time;

    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    @Column(name = "orderid", nullable = false)
    public int getOrderid() {
        return orderid;
    }

    public void setOrderid(int orderid) {
        this.orderid = orderid;
    }

    @Basic
    @Column(name = "userid", nullable = false)
    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    @Basic   @Column(name = "price", nullable = false)
    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Basic
    @Column(name = "time", nullable = false, insertable = false,updatable= false)
    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order that = (Order) o;
        return orderid == that.orderid &&
                userid == that.userid &&
                Objects.equals(price, that.price) &&
                Objects.equals(time, that.time);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderid, userid, price, time);
    }
}
