package bookstore.controller;

import bookstore.entity.Book;
import bookstore.service.BookService;
import bookstore.service.UserService;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.json.*;
import javax.json.stream.JsonGenerator;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/book")
public class BookController {
    @Autowired
    private BookService bService;
    @Autowired
    private UserService uService;


    @RequestMapping("/query")
    protected String doQuery(String key, HttpServletResponse resp) throws IOException {
       // PrintWriter out = resp.getWriter();
        String p = uService.getPicture("book6");
       // Book b = bService.findByTitleLike(key).get(0);
        //System.out.println(buildJson(b));
        return p;
     //   out.print(buildJson(b));
    }

    @RequestMapping("/get")
    protected JSONArray GetBook(){
        List<Book> books = bService.queryAllBy();
        return JSONArray.fromObject(books);
    }


    private String buildJson(Book b) {
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

    private JSONArray buildJsonArr(List<Book> b) {
        json_array.clear();
        json_array.addAll(b);
        return json_array;
    }

}