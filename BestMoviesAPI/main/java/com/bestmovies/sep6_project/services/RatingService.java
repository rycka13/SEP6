package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.model.Rating;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RatingService {
    private MovieDao dao;

    public RatingService(){
        try {
            dao = new MovieDao();
        }
        catch (Exception e){
            System.out.println(e.getStackTrace());
        }
    }

    public List<Rating> getAllRatings(){
        return dao.getAllRatings();
    }

    public Movie getRatingById(int id) {
        return dao.getMovieById(id);
    }

    public boolean createRating(double rating, Movie movie, int votes) {

        return false;
    }

    public boolean editRating(Rating updatedRating, int ratingId) {
        return true;
    }

    public boolean deleteRating(int movieId) {
        return true;
    }
}
