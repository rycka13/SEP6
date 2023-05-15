package com.bestmovies.sep6_project.dao.interfaces;

import com.bestmovies.sep6_project.model.Movie;

import java.util.List;

public interface IMovieReaderMapper {

    List<Movie> getAll();
    List<Movie> getMovieById();
}
