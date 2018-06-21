package bookstore.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "order_detail", schema = "test", catalog = "")
@IdClass(OrderDetailPK.class)
public class OrderDetail {
    private int orderid;
    private int bookid;
    private int quantity;

    @Id
    @Column(name = "orderid", nullable = false)
    public int getOrderid() {
        return orderid;
    }

    public void setOrderid(int orderid) {
        this.orderid = orderid;
    }

    @Id
    @Column(name = "bookid", nullable = false)
    public int getBookid() {
        return bookid;
    }

    public void setBookid(int bookid) {
        this.bookid = bookid;
    }

    @Basic
    @Column(name = "quantity", nullable = false)
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderDetail that = (OrderDetail) o;
        return orderid == that.orderid &&
                bookid == that.bookid;
    }

    @Override
    public int hashCode() {

        return Objects.hash(orderid, bookid);
    }
}
