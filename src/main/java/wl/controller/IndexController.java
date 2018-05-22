package wl.controller;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import wl.Wordladder;
import wl.userService.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;

@Controller
public class IndexController {
    private static Logger logger = Logger.getLogger(IndexController.class.getClass());

    @Resource
    private UserService userService;

    @RequestMapping("/home")
    public String home() {
        return "home";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/result",method = RequestMethod.POST)
    public ModelAndView toAdmin(ModelAndView model,
                                @RequestParam("word1")String word1,
                              @RequestParam("word2")String word2,
                              @RequestParam("filename")String filename){
        Wordladder wl = new Wordladder();
        try {
            logger.info("searching from " + word1 +
                            " to " + word2 + "   dictionary : " + filename);
            String answer =wl.GetLadder(filename,word1,word2).getLadder();
             model.addObject("ladder",answer);
             logger.info("Wordladder : " + answer);
        }catch(Exception e){
            logger.error("IOException occured");
        }
        model.setViewName("result");
        return model;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/hello")
    public String hello() {
        return "hello";
    }

    @RequestMapping("/user")
    public String user() {
        return "user";
    }

    @RequestMapping("/login")
    public String login(){
        return "login";
    }

    @RequestMapping("/")
    public String root() {
        return "home";
    }

    @RequestMapping("/403")
    public String error(){
        return "403";
    }
}
