package bookstore.service;


import java.util.List;

import bookstore.dao.BookDao;
import bookstore.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/* Book服务接口 */

public interface BookService {
    Book queryById(int id);

    Book queryByTitle(String t);

    Book create(Book b);

    Book update(Book book) ;

    List<Book>findByTitleLike(String tit);

    List<Book> queryAllBy();
}