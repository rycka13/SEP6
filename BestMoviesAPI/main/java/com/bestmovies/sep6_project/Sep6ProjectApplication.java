package com.bestmovies.sep6_project;

import com.bestmovies.sep6_project.dao.MovieDao;
import com.bestmovies.sep6_project.model.*;
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
    MovieDao dao = new MovieDao();
    public TestDb() throws IOException {

    }
    @GetMapping("/all")
    public List<Star> greet() throws IOException {
        return dao.getAllStars();
    }

    @GetMapping("/directors")
    public List<Director> getDirectors(){
        return dao.getAllDirectors();
    }
}