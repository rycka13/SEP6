package com.bestmovies.sep6_project.controllers;

import com.bestmovies.sep6_project.model.Rating;
import com.bestmovies.sep6_project.services.RatingService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/rating")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @RequestMapping(value = "/save", method = RequestMethod.POST, consumes="application/json")
    public void addMovie(@RequestBody Rating rating, HttpServletResponse response){
        setResponse(response, ratingService.createRating(rating));
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    List<Rating> getAllRatings(){
        return ratingService.getAllRatings();
    }

    @RequestMapping(value = "/movieId/{movieId}", method = RequestMethod.PUT, consumes="application/json")
    public void updateRating(@RequestBody Rating updatedRating, @PathVariable long movieId, HttpServletResponse response){
        setResponse(response, ratingService.editRating(updatedRating ,movieId));
    }

    @RequestMapping(value = "/movieId/{movieId}", method = RequestMethod.DELETE)
    public void deleteRating(@PathVariable long movieId, HttpServletResponse response){
        setResponse(response, ratingService.deleteRating(movieId));
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    Rating getRatingById(@PathVariable long id){
        return ratingService.getRatingById(id);
    }

    @RequestMapping(value = "/byMovieId/{movieId}", method = RequestMethod.GET)
    public Rating getRatingByMovieId(@PathVariable long movieId){
        return ratingService.getRatingByMovieId(movieId);
    }

    public void setResponse(HttpServletResponse response, boolean success){
        if(success){
            response.setStatus(HttpStatus.SC_OK);
        }
        else {
            response.setStatus(HttpStatus.SC_BAD_REQUEST);
        }
    }
    @RequestMapping(value = "/star/avg/{personId}", method = RequestMethod.GET)
    public double avgRatingOfStarMovies(@PathVariable long personId) {
        return ratingService.avgRatingOfStarMovies(personId);
    }

    @RequestMapping(value = "/director/avg/{personId}", method = RequestMethod.GET)
    public double avgRatingOfDirectorMovies(@PathVariable long personId) {
        return ratingService.avgRatingOfDirectorMovies(personId);
    }
}
