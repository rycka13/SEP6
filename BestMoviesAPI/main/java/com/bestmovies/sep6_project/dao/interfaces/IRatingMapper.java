package com.bestmovies.sep6_project.dao.interfaces;

import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.model.Rating;

import java.util.List;

public interface IRatingMapper {
    List<Rating> getAll();
    void createRating(Rating rating);
    void updateRating(Rating rating);
    void deleteRating(long id);

    Rating getRatingById(long id);
}
