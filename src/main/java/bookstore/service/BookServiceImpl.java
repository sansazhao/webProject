package bookstore.service;


import java.util.List;

import bookstore.dao.BookDao;
import bookstore.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/* Book业务实现类 */
@Service
public class BookServiceImpl implements BookService{
    @Autowired
    private BookDao bookRepo;

    public Book queryById(int id) {
        return bookRepo.queryById(id).get(0);
    }

    public Book queryByTitle(String t) {
        return bookRepo.queryByTitle(t).get(0);
    }

    public Book create(Book b) {
        return bookRepo.save(b);
    }

    public Book update(Book book) {
        return bookRepo.save(book);
    }

    public List<Book>findByTitleLike(String tit){
        return bookRepo.findByTitleLike(tit);
    }

    public List<Book> queryAllBy(){
        List<Book> list = bookRepo.queryAllBy();
        System.out.println(list.size());
        return list;
    }
}