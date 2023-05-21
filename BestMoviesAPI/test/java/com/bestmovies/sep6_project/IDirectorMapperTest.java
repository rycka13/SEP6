package com.bestmovies.sep6_project;

import com.bestmovies.sep6_project.dao.interfaces.IDirectorMapper;
import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.model.Director;
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
public class IDirectorMapperTest {

    @Autowired
    private IDirectorMapper directorMapper;

    @Test
    @Order(1)
    void getAllTest(){
        List<Director> directors = directorMapper.getAll();
        assertThat(objectToId(directors)).isEqualTo(List.of(1L,2L,3L,4L,5L));
    }
    @Test
    @Order(2)
    void getByMovieIdTest(){
        List<Director> directors = directorMapper.getByMovieId(5);
        assertThat(objectToId(directors)).isEqualTo(List.of(4L,5L));
    }
    @Test
    @Order(3)
    void getDirectorsByBirthTest(){
        List<Director> directors = directorMapper.getDirectorsByBirth(2023);
        assertThat(objectToId(directors)).isEqualTo(List.of(1L,3L));
    }
    @Test
    @Order(4)
    void getDirectorsByNameTest(){
        List<Director> directors = directorMapper.getDirectorsByName("Person3");
        assertThat(objectToId(directors)).isEqualTo(List.of(3L,4L));
    }
    @Test
    @Order(5)
    void getDirectorByIdTest(){
        Director director = directorMapper.getDirectorById(5);
        assertThat(director.getId()).isEqualTo(5);
    }
    @Test
    @Order(6)
    void createDirectorTest(){
        Movie movie = new Movie(1,"Test1", 2023);
        Director director = new Director("CreatePerson", 2015);
        director.setAddMovie(movie);
        directorMapper.createDirector(director);
        directorMapper.addMovieDirector(director);
        long directorId = directorMapper.getDirectorsByName("CreatePerson").get(0).getId();
        assertThat(directorMapper.getDirectorById(directorId).getName()).isEqualTo(director.getName());
    }
    @Test
    @Order(7)
    void updateDirectorTest(){
        long directorId = directorMapper.getDirectorsByName("CreatePerson").get(0).getId();
        Director director = new Director(directorId,"UpdatePerson", 2015);
        directorMapper.updateDirector(director);
        directorId = directorMapper.getDirectorsByName("UpdatePerson").get(0).getId();
        assertThat(directorMapper.getDirectorById(directorId).getName()).isEqualTo(director.getName());
    }
    @Test
    @Order(8)
    void deleteDirectorTest(){
        long directorId = directorMapper.getDirectorsByName("UpdatePerson").get(0).getId();
        directorMapper.deleteDirector(directorId);
        assertThat(directorMapper.getDirectorById(11)).isNull();
    }
    @Test
    @Order(9)
    void addMovieDirectorTest(){
        Movie movie = new Movie(1,"Test1", 2023);
        Director director = new Director(5,"Person5", 2019);
        director.setAddMovie(movie);
        directorMapper.addMovieDirector(director);
        assertThat(objectToId(directorMapper.getByMovieId(1))).isEqualTo(List.of(1L, 5L));
    }
}
