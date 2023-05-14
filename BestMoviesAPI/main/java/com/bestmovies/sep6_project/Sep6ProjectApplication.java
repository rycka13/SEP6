package com.bestmovies.sep6_project;

import com.bestmovies.sep6_project.dao.MovieReaderDao;
import com.bestmovies.sep6_project.dao.MovieReaderMapper;
import com.bestmovies.sep6_project.model.Movie;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.type.MappedTypes;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@SpringBootApplication
public class Sep6ProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(Sep6ProjectApplication.class, args);
    }
}

@RestController
class Helloworld {
    @GetMapping("/")
    public String greet() {
        return "Hello!";
    }
}

@RestController
@RequestMapping("/test")
class TestDb {
    MovieReaderDao dao = new MovieReaderDao();
    public TestDb() throws IOException {

    }
    @GetMapping("/all")
    public List<Movie> greet() throws IOException {
        return dao.getAllMovies();
    }
}