package com.bestmovies.sep6_project.dao.interfaces;

import com.bestmovies.sep6_project.model.Movie;

import java.util.List;

public interface MovieReaderMapper {

    List<Movie> getAll();
    List<Movie> getMovieById();
}
