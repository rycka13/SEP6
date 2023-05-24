package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.dao.interfaces.IRatingMapper;
import com.bestmovies.sep6_project.model.Rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RatingService {
    @Autowired
    private IRatingMapper ratingMapper;

    public List<Rating> getAllRatings(){
        return ratingMapper.getAll();
    }

    public Rating getRatingById(long id) {
        return ratingMapper.getRatingByMovieId(id);
    }

    public boolean createRating(Rating rating) {
        if(rating.getRating() > 0 && rating.getMovie() != null && rating.getVotes() > 0){
            ratingMapper.createRating(rating);
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

    public Rating getRatingByMovieId(long id){
        if(id > 0){
            return ratingMapper.getRatingByMovieId(id);
        }
        return null;
    }

    public double avgRatingOfStarMovies(long id) {
        if (id > 0) {
            return ratingMapper.avgRatingOfStarMovies(id);
        } else return -1;
    }

    public double avgRatingOfDirectorMovies(long id) {
        if (id > 0) {
            return ratingMapper.avgRatingOfDirectorMovies(id);
        } else return -1;
    }
}
