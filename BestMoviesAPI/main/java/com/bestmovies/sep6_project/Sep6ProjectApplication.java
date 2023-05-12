package com.bestmovies.sep6_project;

import com.bestmovies.sep6_project.dao.MovieReaderMapper;
import com.bestmovies.sep6_project.model.Movie;
import org.apache.ibatis.type.MappedTypes;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@MappedTypes(Movie.class)
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
    private MovieReaderMapper movieReaderMapper;

    public TestDb(MovieReaderMapper movieReaderMapper) {
        this.movieReaderMapper = movieReaderMapper;
    }

    @GetMapping("/all")
    public List<Movie> greet() {
        return movieReaderMapper.findAll();
    }
}