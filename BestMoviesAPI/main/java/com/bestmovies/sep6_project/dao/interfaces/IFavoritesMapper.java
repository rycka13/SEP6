package com.bestmovies.sep6_project.dao.interfaces;

import com.bestmovies.sep6_project.model.Movie;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IFavoritesMapper {
    void addMovieToFavorites(long userId, long movieId);
    void addMoviesToFavoritesWithRating(long userId, long movieId, int rating);
    void addRatingToMovie(long userId, long movieId, int rating);
    void removeRatingFromMovie(long userId, long movieId);
    void removeMovieFromFavorites(long userId, long movieId);
    List<Movie> getFavorites(long userId);
    Integer getRatingByMovieId(long userId, long movieId);
}
