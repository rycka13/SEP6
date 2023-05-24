package com.bestmovies.sep6_project.controllers;

import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.services.FavoritesService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/favorites")
public class FavoritesController {
    @Autowired
    FavoritesService favoritesService;

    @RequestMapping(value = "/add/{username}/{movieId}", method = RequestMethod.POST, consumes="application/json")
    public void addMoviesToFavorites(@PathVariable String username, @PathVariable long movieId, HttpServletResponse response){
        setResponse(response, favoritesService.addMoviesToFavorites(username, movieId));
    }

    @RequestMapping(value = "/add/{username}/{movieId}/{rating}", method = RequestMethod.POST, consumes="application/json")
    public void addMoviesToFavoritesWithRating(@PathVariable String username, @PathVariable long movieId, @PathVariable int rating, HttpServletResponse response){
        setResponse(response, favoritesService.addMoviesToFavoritesWithRating(username, movieId, rating));
    }

    @RequestMapping(value = "/add/rating/{username}/{movieId}/{rating}", method = RequestMethod.POST, consumes="application/json")
    public void addRatingToMovie(@PathVariable String username, @PathVariable long movieId, @PathVariable int rating, HttpServletResponse response){
        setResponse(response, favoritesService.addRatingToMovie(username, movieId, rating));
    }

    @RequestMapping(value = "/remove/rating/{username}/{movieId}", method = RequestMethod.POST, consumes="application/json")
    public void removeRatingFromMovie(@PathVariable String username, @PathVariable long movieId, HttpServletResponse response){
        setResponse(response, favoritesService.removeRatingFromMovie(username, movieId));
    }

    @RequestMapping(value = "/remove/{username}/{movieId}", method = RequestMethod.POST, consumes="application/json")
    public void removeMovieFromFavorites(@PathVariable String username, @PathVariable long movieId, HttpServletResponse response){
        setResponse(response, favoritesService.removeMovieFromFavorites(username, movieId));
    }

    @RequestMapping(value = "/{username}",method = RequestMethod.GET)
    List<Movie> getDirectorsByBirth(@PathVariable String username){
        return favoritesService.getFavorites(username);
    }

    public void setResponse(HttpServletResponse response, boolean success){
        if(success){
            response.setStatus(HttpStatus.SC_OK);
        }
        else {
            response.setStatus(HttpStatus.SC_BAD_REQUEST);
        }
    }
}
