package wl;

import static org.junit.Assert.*;
import org.junit.Test;
import org.junit.Before; 
import org.junit.After;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.servlet.ModelAndView;
import wl.config.ErrorPageConfig;
import wl.config.WebSecurityConfig;
import wl.controller.IndexController;
import wl.repo.SUserRepository;
import wl.userService.MyUserDetailsService;
import wl.userService.SecuritySUser;
import wl.userService.UserService;

import java.util.*;

/**
* Wordladder Tester. 
* 
* @author <Authors name> 
* @since <pre>03/10/2018</pre> 
* @version 1.0 
*/ 
public class WordladderTest {
    static private Wordladder wl = new Wordladder();

@Before
public void before() throws Exception {
    //wl.clear();
    assertTrue(Wordladder.word1.equals(""));
    assertTrue(Wordladder.word2.equals(""));
    assertTrue(Wordladder.filename.equals(""));
    System.out.println("before");
} 

@After
public void after() throws Exception {
    Wordladder.clear();
    assertTrue(Wordladder.word1.equals(""));
    assertTrue(Wordladder.word2.equals(""));
    assertTrue(Wordladder.filename.equals(""));
    System.out.println("after");
} 

/** 
* 
* Method: neighbor(String wl, String w2, Stack<String>curs)
* 
*/ 
@Test
public void testNeighbor() throws Exception { 
//TODO: Test goes here...
    System.out.println("testNeighbor");
    String x = "data";
    String y = "date";
    Stack<String>s = new Stack<String>();
    s.add(y);
    assertTrue(s.peek().equals("date"));
    assertNotNull(s);
} 

/** 
* 
* Method: main(String args[]) 
* 
*/ 
@Test
public void testMain() throws Exception {
    System.out.println("main");
    assertSame(Wordladder.word1,Wordladder.word2);
//TODO: Test goes here... 
} 

/** 
* 
* Method: ladder_to_word(String word2, Stack<String>cur_stack) 
* 
*/ 
@Test
public void testLadder_to_word() throws Exception { 
//TODO: Test goes here...
    System.out.println("Ladder_to_word");
    assertNotSame(Wordladder.used_wordSet,Wordladder.word2);
} 

/** 
* 
* Method: printLadder(String word1, String word2, Stack<String>cur_stack) 
* 
*/ 
@Test
public void testPrintLadder() throws Exception { 
//TODO: Test goes here...
    System.out.println("print");
/*
try { 
   Method method = Wordladder.getClass().getMethod("printLadder", String.class, String.class, Stack<String>cur_stack.class); 
   method.setAccessible(true); 
   method.invoke(<Object>, <Parameters>); 
} catch(NoSuchMethodException e) { 
} catch(IllegalAccessException e) { 
} catch(InvocationTargetException e) { 
} 
*/ 
} 

/** 
* 
* Method: searchLadder(String w1, String w2) 
* 
*/

@Test
public void testSearchLadder() throws Exception { 
//TODO: Test goes here...
    System.out.println("searchLadder");
    String a  = "data";
    String b = "code";
    Wordladder.searchLadder("data","code");
}

@Test
public void testGetladder() throws Exception {
//TODO: Test goes here...
        //input error test
        Wordladder.GetLadder("dictionary.txt","data","code");
        assertSame("文件不存在",
                Wordladder.GetLadder("d","data","code").getLadder());
        System.out.println("文件存在测试");
        assertSame("两个单词长度必须一致",
            Wordladder.GetLadder("dictionary.txt","data","cod").getLadder());
        System.out.println("单词长度一致性测试");
        assertSame("请输入两个不同的单词",
            Wordladder.GetLadder("dictionary.txt","code","code").getLadder());
        System.out.println("单词不一致测试");
        assertSame("请输入word2",
            Wordladder.GetLadder("dictionary.txt","data","").getLadder());
        System.out.println("输入有效测试");
        assertSame("字典中无法找到两单词",Wordladder.GetLadder("dictionary.txt","aaaaaa","bbbbbb").getLadder());
        System.out.println("单词存在性测试");
        System.out.println("searchLadder");
        Wordladder.searchLadder("data","code");
    }

@Test
public void testUserRole() {
    UserService suserService = new UserService();
    Set<SRole> r = new HashSet<SRole>();
    SUser user = new SUser();
    SRole role = new SRole(user);
    SRole role1 = new SRole();
    role.setId(1L);
    role.setName("ROLE_ADMIN");
    role.setSUser(user);
    r.add(role);

    SUser user2 = new SUser("user2","123456",r);
    SRole role2 = new SRole(user,"ROLE_ADMIN");

    user.setId(5L);
    user.setName("usertest");
    user.setPassword("123456");
    user.setSRoles(r);

    assertSame(5L,user.getId());
    assertSame("usertest",user.getName());
    assertSame("123456",user.getPassword());
    assertSame(r,user.getSRoles());

    assertSame(1L,role.getId());
    assertSame("ROLE_ADMIN",role.getName());
    assertSame(user,role.getSUser());

    Collection<SimpleGrantedAuthority> auth = new ArrayList<SimpleGrantedAuthority>();
    for (SRole SRole : r) {
        auth.add(new SimpleGrantedAuthority(SRole.getName()));
    }
    SecuritySUser su = new SecuritySUser(user);
    SecuritySUser su1 = new SecuritySUser(user,auth);
    assertSame("123456",su.getPassword());
    assertSame("usertest",su.getUsername());
    assertNotNull(su1.getAuthorities());

    assertTrue(su.isEnabled());
    assertTrue(su.isAccountNonExpired());
    assertTrue(su.isAccountNonLocked());
    assertTrue(su.isCredentialsNonExpired());
    System.out.println("User/Role相关测试");
}

@Test
public void testService() throws Exception {
//TODO: Test goes here...
    WebSecurityConfig webCon = new WebSecurityConfig();
    ErrorPageConfig erPage = new ErrorPageConfig();
    erPage.embeddedServletContainerCustomizer();
    webCon.userDetailsService();
    MyUserDetailsService u = new MyUserDetailsService();
    SUserRepository suserRepository;
    Application app = new Application();
    System.out.println("服务类可被调用测试");
}
    @Test
    public void testController() throws Exception {
//TODO: Test goes here...
        ModelAndView mod = new ModelAndView();
        IndexController controller =  new IndexController();
        assertSame("403",controller.error());
        assertSame("hello",controller.hello());
        assertSame("home",controller.home());
        assertSame("home",controller.root());
        assertSame(mod,controller.toAdmin(mod,"code","data","dictionary.txt"));
        System.out.println("controller跳转正确性测试");
    }
}
