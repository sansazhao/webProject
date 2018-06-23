package bookstore.service;

import bookstore.dao.BookDao;
import bookstore.dao.OrderDao;
import bookstore.dao.OrderDetailDao;
import bookstore.dao.UserDao;
import bookstore.entity.Book;
import bookstore.entity.Order;
import bookstore.entity.OrderDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.json.*;
import javax.json.stream.JsonGenerator;
import java.io.StringWriter;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImpl  implements OrderService  {
    @Autowired
    private UserDao userRepo;
    @Autowired
    private BookDao bRepo;
    @Autowired
    private OrderDao orderRepo;
    @Autowired
    private OrderDetailDao orDetailRepo;

    public List<Order> queryAllByUserName(String uname){
        int uid = userRepo.queryByUsername(uname).get(0).getId();
        List<Order> o = orderRepo.queryOrderByUserid(uid);
        for (Order item:o){
            System.out.println(convertTime(item.getTime()));
        }
        return o;
    }

    public List<String> queryOrder(String uname){
        List<String> os  = new ArrayList<>();
        int uid = userRepo.queryByUsername(uname).get(0).getId();
        List<Order> o = orderRepo.queryOrderByUserid(uid);
        for (Order item:o){
            os.add(buildJson(item));
        }
        return os;
    }

    public List<String> queryOrderDetail(Integer id){
        List<String> os  = new ArrayList<>();
        List<OrderDetail> o = orDetailRepo.queryOrderByOrderid(id);
        for (OrderDetail item: o){
            os.add(buildJson(item));
        }
        return os;
    }

    public List<String> queryTotalSale(){
        List<Order> o = orderRepo.findAll();
        List<String> os = new ArrayList<>();
        for (Order item: o){
            os.add(buildJson(item));
        }
        return os;
    }

    private String convertTime(Timestamp ts){
        String tsStr = "";
        DateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        tsStr = sdf.format(ts);
        return tsStr;
    }

    private String buildJson(Order o) {
        /* Build JSON Object Model */
        JsonObject model = Json.createObjectBuilder()
                .add("orderid", o.getOrderid())
                .add("price", o.getPrice())
                .add("quantity", o.getQuantity())
                .add("time", convertTime(o.getTime()))
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
        return model.toString();
    }

    private String buildJson(OrderDetail od) {
        /* Build JSON Object Model */
        Book b = bRepo.queryById(od.getBookid()).get(0);
        JsonObject model = Json.createObjectBuilder()
                .add("title", b.getTitle())
                .add("price", b.getPrice())
                .add("quantity", od.getQuantity())
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
        return model.toString();
    }
}
