package com.bestmovies.sep6_project.dao.interfaces;

import com.bestmovies.sep6_project.model.Director;

import java.util.List;

public interface IDirectorMapper {
    
    List<Director> getByMovieId(int movieId);

    List<Director> getAll();
}
