package com.bestmovies.sep6_project.dao.interfaces;

import com.bestmovies.sep6_project.model.Movie;

import java.util.List;

public interface IMovieMapper {

    List<Movie> getAll();
    Movie getMovieById(long id);
    List<Movie> getNMoviesByRating(double rating, int n);
    List<Movie> getNMoviesByVotes(double rating, int n);
    void createMovie(Movie movie);
    void updateMovie(Movie movie);
    void deleteMovie(long id);
}
