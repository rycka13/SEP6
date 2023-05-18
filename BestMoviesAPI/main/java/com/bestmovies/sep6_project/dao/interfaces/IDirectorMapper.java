package com.bestmovies.sep6_project.dao.interfaces;

import com.bestmovies.sep6_project.model.Director;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

public interface IDirectorMapper {
    List<Director> getByMovieId(long movieId);
    List<Director> getAll();
    List<Director> getDirectorsByBirth(int birth);
    List<Director> getDirectorsByName(String name);
    Director getDirectorById(long id);
    void createDirector(Director director);
    void updateDirector(Director director);
    void deleteDirector(long id);
    void addMovieDirector(Director director);

}
