package bookstore.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class OrderDetailPK implements Serializable {
    private int orderid;
    private int bookid;

    @Column(name = "orderid", nullable = false)
    @Id
    public int getOrderid() {
        return orderid;
    }

    public void setOrderid(int orderid) {
        this.orderid = orderid;
    }

    @Column(name = "bookid", nullable = false)
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
        OrderDetailPK that = (OrderDetailPK) o;
        return orderid == that.orderid &&
                bookid == that.bookid;
    }

    @Override
    public int hashCode() {

        return Objects.hash(orderid, bookid);
    }
}
