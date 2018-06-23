package bookstore.dao;


import bookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/*
* Book类接口
* spring-data-jpa 动态查询
* */
@Repository
public interface BookDao extends JpaRepository<Book, Integer> {

    @Query("select u from Book u where u.id=:id")
    List<Book> queryById(@Param("id")int id);

    @Query("select u from Book u where u.title=:title")
    List<Book> queryByTitle(@Param("title")String title);

    List<Book> findByTitleLike(@Param("title")String title);

    @Query("select u from Book u")
    List<Book> queryAllBy();

   // List<Book> findByTitleContainsAndAuthorContainsAndLanguageContainsAndPriceBetweenAndAndYearBetween
//            (String bookname, String author, String lang,Integer down_price, Integer up_price, Integer down_year, Integer up_year);

  //  List<Book> findByTitleContains(String title);

    List<Book> queryByAuthorContains(String auther);

    List<Book> queryByLanguage(String language);

}
