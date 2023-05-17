package com.bestmovies.sep6_project.dao.interfaces;

import com.bestmovies.sep6_project.model.Director;

import java.util.List;

public interface IDirectorMapper {

    Director getByDirectorId(long id);

    List<Director> getAll();
    void createDirector(Director director);
    void updateDirector(Director director);
    void deleteDirector(long id);
}
