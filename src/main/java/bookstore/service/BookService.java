package bookstore.service;


import java.util.List;
import bookstore.entity.Book;


/* Book业务接口 */

public interface BookService {
    Book queryById(int id);

    Book queryByTitle(String t);

    Book create(Book b);

    Book update(Book book) ;

    List<Book>findByTitleLike(String tit);

    List<Book> queryAllBy();
}