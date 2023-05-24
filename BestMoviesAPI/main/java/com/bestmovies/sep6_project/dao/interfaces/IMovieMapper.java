package com.bestmovies.sep6_project.dao.interfaces;

import com.bestmovies.sep6_project.model.Movie;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IMovieMapper {
    List<Movie> getAll();

    Movie getMovieById(long id);

    List<Movie> getNMoviesByRating(double rating, int n);

    List<Movie> getNMoviesByVotes(int votes, int n);

    List<Movie> getAllMoviesForDirector(long id);

    List<Movie> getAllMoviesForStar(long id);

    List<Movie> getNMoviesByYear(int year, int n);

    List<Movie> getMoviesByYear(int year);

    List<Movie> getNMostPopularMovies(int n);

    List<Movie> getNMostPopularMoviesByYear(int year, int n);

    List<Movie> getNBestRatedMovies(int n);

    List<Movie> getMoviesByTitle(String title);

    List<Movie> getNMoviesByPage(int pageNum, int limit);

    void createMovie(Movie movie);

    void updateMovie(Movie movie);

    void deleteMovie(long id);

    double avgRatingOfStarMovies(long id);

    double avgRatingOfDirectorMovies(long id);
}
