package bookstore.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "books", schema = "test", catalog = "")
public class Book {
    private int id;
    private String title;
    private String author;
    private String language;
    private String published;
    private String sales;
    private int price;

    @Id
    @Column(name = "id", nullable = false, precision = 0)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "title", nullable = true, length = 30)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "author", nullable = true, length = 20)
    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    @Basic
    @Column(name = "language", nullable = true, length = 20)
    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    @Basic
    @Column(name = "published", nullable = true, length = 20)
    public String getPublished() {
        return published;
    }

    public void setPublished(String published) {
        this.published = published;
    }

    @Basic
    @Column(name = "sales", nullable = true, length = 20)
    public String getSales() {
        return sales;
    }

    public void setSales(String sales) {
        this.sales = sales;
    }

    @Basic
    @Column(name = "price", nullable = true, length = 20)
    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Book that = (Book) o;
        return id == that.id &&
                Objects.equals(title, that.title) &&
                Objects.equals(author, that.author) &&
                Objects.equals(language, that.language) &&
                Objects.equals(published, that.published) &&
                Objects.equals(sales, that.sales);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, title, author, language, published, sales);
    }
}
