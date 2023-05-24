package com.bestmovies.sep6_project;

import com.bestmovies.sep6_project.dao.interfaces.IStarMapper;
import com.bestmovies.sep6_project.dao.interfaces.IUserMapper;
import com.bestmovies.sep6_project.model.Hash.HashPair;
import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.model.Star;
import com.bestmovies.sep6_project.model.User.User;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static com.bestmovies.sep6_project.Utils.objectToId;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(properties = "spring.config.name=application-test")
public class IUserMapperTest {

    @Autowired
    private IUserMapper userMapper;

    @Test
    void getUserByUsernameTest(){
        User user = userMapper.getUserByUsername("TestUser1");
        assertThat(user.getId()).isEqualTo(1L);
    }
    @Test
    void getUserByIdTest(){
        User user = userMapper.getUserById(1);
        assertThat(user.getUserName()).isEqualTo("TestUser1");
    }
    @Test
    void getUserByEmailTest(){
        User user = userMapper.getUserByEmail("test1email@gmail.com");
        assertThat(user.getUserName()).isEqualTo("TestUser1");
    }
    @Test
    void registerUserTest(){
        User user = new User();
        user.setUserName("TestUser4");
        user.setFirstName("Test4");
        user.setLastName("User4");
        user.setEmail("test4email@gmail.com");
        byte[] byteArray = new byte[]{ (byte) 0x01 };
        HashPair password = new HashPair(byteArray, null);
        user.setHashedPassword(password);
        userMapper.registerUser(user);
        assertThat(userMapper.getUserByUsername("TestUser4")).isNotNull();
    }
}
