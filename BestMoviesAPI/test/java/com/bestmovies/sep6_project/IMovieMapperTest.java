package com.bestmovies.sep6_project;

import com.bestmovies.sep6_project.dao.interfaces.IMovieMapper;
import com.bestmovies.sep6_project.model.Movie;
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
public class IMovieMapperTest {

    @Autowired
    private IMovieMapper movieMapper;

    @Test
    @Order(1)
    void getAllMoviesTest() {
        List<Movie> movies = movieMapper.getAll();
        assertThat(objectToId(movies)).isEqualTo(List.of(1L, 2L, 3L, 4L, 5L));
    }
    @Test
    @Order(2)
    void getNMoviesByRatingTest() {
        List<Movie> movies = movieMapper.getNMoviesByRating(10, 1);
        assertThat(objectToId(movies)).isEqualTo(List.of(1L));
    }
    @Test
    @Order(3)
    void getNMoviesByVotesTest() {
        List<Movie> movies = movieMapper.getNMoviesByVotes(100, 1);
        assertThat(objectToId(movies)).isEqualTo(List.of(1L));
    }
    @Test
    @Order(4)
    void getAllMoviesForDirectorTest() {
        List<Movie> movies = movieMapper.getAllMoviesForDirector(1);
        assertThat(objectToId(movies)).isEqualTo(List.of(1L, 2L));
    }
    @Test
    @Order(5)
    void getAllMoviesForStarTest() {
        List<Movie> movies = movieMapper.getAllMoviesForStar(6);
        assertThat(objectToId(movies)).isEqualTo(List.of(1L, 2L));
    }
    @Test
    @Order(6)
    void getNMoviesByYearTest() {
        List<Movie> movies = movieMapper.getNMoviesByYear(2023, 2);
        assertThat(objectToId(movies)).isEqualTo(List.of(1L, 2L));
    }
    @Test
    @Order(7)
    void getMoviesByYearTest() {
        List<Movie> movies = movieMapper.getMoviesByYear(2023);
        assertThat(objectToId(movies)).isEqualTo(List.of(1L, 2L, 4L));
    }
    @Test
    @Order(8)
    void getNMostPopularMoviesTest() {
        List<Movie> movies = movieMapper.getNMostPopularMovies(3);
        assertThat(objectToId(movies)).isEqualTo(List.of(1L, 3L, 2L));
    }
    @Test
    @Order(9)
    void getNBestRatedMoviesTest() {
        List<Movie> movies = movieMapper.getNBestRatedMovies(3);
        assertThat(objectToId(movies)).isEqualTo(List.of(1L, 2L, 3L));
    }
    @Test
    @Order(10)
    void getMoviesByTitleTest() {
        List<Movie> movies = movieMapper.getMoviesByTitle("Test1");
        assertThat(objectToId(movies)).isEqualTo(List.of(1L));
    }
    @Test
    @Order(11)
    void getNMoviesByPageTest() {
        List<Movie> movies = movieMapper.getNMoviesByPage(2, 2);
        assertThat(objectToId(movies)).isEqualTo(List.of(3L, 4L));
    }
    @Test
    @Order(12)
    void createMovieTest() {
        Movie movie = new Movie("CreateMovie", 2023);
        movieMapper.createMovie(movie);
        assertThat(movie.getId()).isEqualTo(movieMapper.getMoviesByTitle("CreateMovie").get(0).getId());
    }

    @Test
    @Order(13)
    void getMovieByIdTest() {
        Movie movie = movieMapper.getMovieById(1);
        assertThat(movie.getTitle()).isEqualTo("Test1");
        assertThat(movie.getYear()).isEqualTo(2023);
    }

    @Test
    @Order(14)
    void updateMovieTest() {
        Movie createdMovie = movieMapper.getMoviesByTitle("CreateMovie").get(0);
        Movie movie = new Movie(createdMovie.getId(), createdMovie.getTitle(), 2022);
        movieMapper.updateMovie(movie);

        assertThat(movieMapper.getMoviesByTitle("CreateMovie").get(0).getYear()).isEqualTo(2022);
    }
    @Test
    @Order(15)
    void deleteMovieTest() {
        Movie createdMovie = movieMapper.getMoviesByTitle("CreateMovie").get(0);
        movieMapper.deleteMovie(createdMovie.getId());

        assertThat(movieMapper.getMoviesByTitle("CreateMovie").size()).isEqualTo(0);
    }
    @Test
    @Order(16)
    void getNMostPopularMoviesByYearTest() {
        List<Movie> movies = movieMapper.getNMostPopularMoviesByYear(2023, 3);

        assertThat(objectToId(movies)).isEqualTo(List.of(1L,2L,4L));
    }
}
