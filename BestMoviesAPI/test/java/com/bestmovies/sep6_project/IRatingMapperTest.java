package com.bestmovies.sep6_project;

import com.bestmovies.sep6_project.dao.interfaces.IRatingMapper;
import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.model.Rating;
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
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class IRatingMapperTest {

    @Autowired
    private IRatingMapper ratingMapper;

    @Test
    @Order(1)
    void getAllTest() {
        List<Rating> ratings = ratingMapper.getAll();
        assertThat(objectToId(ratings)).isEqualTo(List.of(1L, 2L, 3L, 4L));

    }
    @Test
    @Order(2)
    void createRatingTest() {
        Rating rating = new Rating();
        rating.setRating(1);
        rating.setVotes(1);
        rating.setMovie(new Movie(5, "Test5", 2019));
        ratingMapper.createRating(rating);
        assertThat(ratingMapper.getRatingByMovieId(5)).isNotNull();
    }
    @Test
    @Order(3)
    void updateRatingTest() {
        Rating rating = new Rating();
        rating.setRating(2);
        rating.setVotes(1);
        rating.setMovie(new Movie(5, "Test5", 2019));
        ratingMapper.updateRating(rating);
        assertThat(ratingMapper.getRatingByMovieId(5).getRating()).isEqualTo(2);
    }
    @Test
    @Order(4)
    void deleteRatingTest() {
        ratingMapper.deleteRating(5);
        assertThat(ratingMapper.getRatingByMovieId(5)).isNull();
    }

    @Test
    @Order(5)
    void getRatingByMovieIdTest() {
        Rating rating = ratingMapper.getRatingByMovieId(1);
        assertThat(rating.getMovie().getId()).isEqualTo(1);
        assertThat(rating.getRating()).isEqualTo(10);
        assertThat(rating.getVotes()).isEqualTo(100);
    }
}
