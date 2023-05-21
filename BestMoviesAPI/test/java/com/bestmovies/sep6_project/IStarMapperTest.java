package com.bestmovies.sep6_project;

import com.bestmovies.sep6_project.dao.interfaces.IStarMapper;
import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.model.Star;
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
public class IStarMapperTest {

    @Autowired
    private IStarMapper starMapper;

    @Test
    @Order(1)
    void getAllTest(){
        List<Star> stars = starMapper.getAll();
        assertThat(objectToId(stars)).isEqualTo(List.of(6L,7L,8L,9L,10L));
    }
    @Test
    @Order(2)
    void getByMovieIdTest(){
        List<Star> stars = starMapper.getByMovieId(5);
        assertThat(objectToId(stars)).isEqualTo(List.of(9L,10L));
    }
    @Test
    @Order(3)
    void getStarsByBirthTest(){
        List<Star> stars = starMapper.getStarsByBirth(2018);
        assertThat(objectToId(stars)).isEqualTo(List.of(6L,8L));
    }
    @Test
    @Order(4)
    void getStarsByNameTest(){
        List<Star> stars = starMapper.getStarsByName("Person8");
        assertThat(objectToId(stars)).isEqualTo(List.of(8L,9L));
    }
    @Test
    @Order(5)
    void getStarByIdTest(){
        Star star = starMapper.getStarById(6);
        assertThat(star.getId()).isEqualTo(6);
    }
    @Test
    @Order(6)
    void createStarTest(){
        Movie movie = new Movie(1,"Test1", 2023);
        Star star = new Star("CreatePerson", 2015);
        star.setAddMovie(movie);
        starMapper.createStar(star);
        starMapper.addMovieStar(star);
        long starId = starMapper.getStarsByName("CreatePerson").get(0).getId();
        assertThat(starMapper.getStarById(starId).getName()).isEqualTo(star.getName());
    }
    @Test
    @Order(7)
    void updateStarTest(){
        long starId = starMapper.getStarsByName("CreatePerson").get(0).getId();
        Star star = new Star(starId, "UpdatePerson", 2015);
        starMapper.updateStar(star);
        starId = starMapper.getStarsByName("UpdatePerson").get(0).getId();
        assertThat(starMapper.getStarById(starId).getName()).isEqualTo(star.getName());
    }
    @Test
    @Order(8)
    void deleteStarTest(){
        long starId = starMapper.getStarsByName("UpdatePerson").get(0).getId();
        starMapper.deleteStar(starId);
        assertThat(starMapper.getStarById(starId)).isNull();
    }
    @Test
    @Order(9)
    void addMovieStarTest(){
        Movie movie = new Movie(1,"Test1", 2023);
        Star star = new Star(10,"Person10", 2016);
        star.setAddMovie(movie);
        starMapper.addMovieStar(star);
        assertThat(objectToId(starMapper.getByMovieId(1))).isEqualTo(List.of(6L, 10L));
    }
}
