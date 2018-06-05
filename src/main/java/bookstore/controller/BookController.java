package bookstore.controller;

import bookstore.config.Common;
import bookstore.entity.Book;
import bookstore.service.BookService;
import bookstore.service.BookServiceImpl;
import bookstore.service.CartService;
import bookstore.service.CartServiceImpl;


import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.json.*;
import javax.json.stream.JsonGenerator;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@WebServlet
@Controller
@RequestMapping("/book")
public class BookController extends HttpServlet {
    @Autowired
    private BookService bService;
    @Autowired
    private CartService cartService;

    @RequestMapping("/query")
    protected void doQuery(String key, HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        System.out.println("query : " + key);
        Book b = bService.findByTitleLike(key).get(0);
        System.out.println(buildJson(b));
        out.print(buildJson(b));
    }

    List<Book> b = new ArrayList<>();

    @RequestMapping("/select")
    protected void doSelect(String Book, String Author,
                            String Language, String Published, String Sales,
                            HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(">>>>>>>>>>doSelect()<<<<<<<<<<<" + Book);
        cartService.add(1, bService.queryByTitle(Book));
        PrintWriter out = resp.getWriter();
        out.print(bService.queryByTitle(Book).getPrice());
    }

    @RequestMapping("/delete")
    protected void doDelete(String Book, String Author,
                            String Language, String Published, String Sales,
                            HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(">>>>>>>>>>doDelete()<<<<<<<<<<<" + Book);
        PrintWriter out = resp.getWriter();
        out.println(Book);
    }

    @RequestMapping("/get")
    protected void GetBook(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(">>>>>>>>>>doGETBOOK()<<<<<<<<<<<");
        PrintWriter out = resp.getWriter();
        out.print(buildJsonArr(bService.queryAllBy()));
    }

    public String buildJson(Book b) {
        /* Build JSON Object Model */
        JsonObject model = Json.createObjectBuilder()
                .add("Book", b.getTitle())
                .add("Author", b.getAuthor())
                .add("Language", b.getLanguage())
                .add("Published", b.getPublished())
                .add("Sales", b.getSales())
                .build();

        /* Write JSON Output */
        StringWriter stWriter = new StringWriter();
        try (JsonWriter jsonWriter = Json.createWriter(stWriter)) {
            jsonWriter.writeObject(model);
        }

        /* Write formatted JSON Output */
        Map<String, String> config = new HashMap<>();
        config.put(JsonGenerator.PRETTY_PRINTING, "");
        JsonWriterFactory factory = Json.createWriterFactory(config);

        StringWriter stWriterF = new StringWriter();
        try (JsonWriter jsonWriterF = factory.createWriter(stWriterF)) {
            jsonWriterF.writeObject(model);
        }
        return stWriterF.toString();
    }

    private JSONArray json_array = new JSONArray();

    public JSONArray buildJsonArr(List<Book> b) {
        json_array.clear();
        json_array.addAll(b);
        System.out.println("1:  " + json_array.toString());
        return json_array;
    }

}