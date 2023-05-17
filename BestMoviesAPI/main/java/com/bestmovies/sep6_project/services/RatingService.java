package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.dao.interfaces.IRatingMapper;
import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.model.Rating;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RatingService {
    private IRatingMapper ratingMapper;

    public List<Rating> getAllRatings(){
        return ratingMapper.getAll();
    }

    public Rating getRatingById(long id) {
        return ratingMapper.getRatingById(id);
    }

    public boolean createRating(double rating, Movie movie, int votes) {
        if(rating > 0 && movie != null && votes > 0){
            Rating newRating = new Rating(movie, rating, votes);
            ratingMapper.createRating(newRating);
            return true;
        }

        return false;
    }

    public boolean editRating(Rating updatedRating, long movieId) {
        if(updatedRating != null && movieId > 0){
            updatedRating.getMovie().setId(movieId);
            ratingMapper.updateRating(updatedRating);
            return true;
        }
        return false;
    }

    public boolean deleteRating(long movieId) {
        if(movieId > 0){
            ratingMapper.deleteRating(movieId);
            return true;
        }
        return false;
    }
}
