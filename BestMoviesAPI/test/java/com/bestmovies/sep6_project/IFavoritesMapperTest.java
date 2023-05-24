package com.bestmovies.sep6_project;

import com.bestmovies.sep6_project.dao.interfaces.IFavoritesMapper;
import com.bestmovies.sep6_project.model.Movie;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(properties = "spring.config.name=application-test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class IFavoritesMapperTest {

    @Autowired
    private IFavoritesMapper favoritesMapper;

    @Test
    @Order(1)
    void getFavoritesTest(){
        List<Movie> favorites = favoritesMapper.getFavorites(2);
        assertThat(Utils.objectToId(favorites)).isEqualTo(List.of(3L, 4L));
    }
    @Test
    @Order(2)
    void addMoviesToFavoritesWithRatingTest(){

        favoritesMapper.addMoviesToFavoritesWithRating(3, 1, 10);
        List<Movie> favorites = favoritesMapper.getFavorites(3);
        assertThat(Utils.objectToId(favorites)).isEqualTo(List.of(1L));
    }
    @Test
    @Order(3)
    void addRatingToMovieTest(){

        favoritesMapper.addRatingToMovie(3, 1, 9);
        List<Movie> favorites = favoritesMapper.getFavorites(3);
        assertThat(favorites.get(0).getUserRating()).isEqualTo(9);
    }
    @Test
    @Order(4)
    void removeRatingFromMovieTest(){
        favoritesMapper.removeRatingFromMovie(3, 1);
        List<Movie> favorites = favoritesMapper.getFavorites(3);
        assertThat(favorites.get(0).getUserRating()).isNull();
    }
    @Test
    @Order(5)
    void removeMovieFromFavoritesTest(){
        favoritesMapper.removeMovieFromFavorites(3, 1);
        List<Movie> favorites = favoritesMapper.getFavorites(3);
        assertThat(favorites).isEmpty();
    }
    @Test
    @Order(6)
    void addMoviesToFavoritesTest(){
        favoritesMapper.addMovieToFavorites(3, 1);
        List<Movie> favorites = favoritesMapper.getFavorites(3);
        assertThat(Utils.objectToId(favorites)).isEqualTo(List.of(1L));
        assertThat(favorites.get(0).getUserRating()).isNull();
    }
}
