package com.bestmovies.sep6_project.dao.interfaces;

import com.bestmovies.sep6_project.model.Movie;

import java.util.List;

public interface IMovieMapper {

    List<Movie> getAll();
    List<Movie> getMovieById();
    void createMovie(Movie movie);
    void updateMovie(Movie movie);
    void deleteMovie(int id);
}
