package com.bestmovies.sep6_project;

import com.bestmovies.sep6_project.dao.interfaces.IMovieMapper;
import com.bestmovies.sep6_project.model.Movie;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;
@SpringBootTest(properties = "spring.config.name=application-test")
public class IMovieMapperTest {

    @Autowired
    private IMovieMapper movieMapper;

    @Test
    void getMovieByIdTest() {
        Movie movie = movieMapper.getMovieById(1);
        assertThat(movie.getTitle()).isEqualTo("The Matrix");
        assertThat(movie.getYear()).isEqualTo(1999);
    }
}
