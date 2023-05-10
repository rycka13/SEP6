package com.bestmovies.sep6_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

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