package com.bestmovies.sep6_project.controllers;

import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.services.MovieService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movie")
public class MovieController{

    @Autowired
    private MovieService movieService;

    @RequestMapping(value = "/save", method = RequestMethod.POST, consumes="application/json")
    public void addMovie(@RequestBody Movie movie, HttpServletResponse response){
        setResponse(response, movieService.createMovie(movie.getTitle(), movie.getYear()));
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    List<Movie> getAllMovies(){
        return movieService.getAllMovies();
    }

    @RequestMapping(value = "/movieId/{movieId}", method = RequestMethod.PUT, consumes="application/json")
    public void updateMovie(@RequestBody Movie updatedMovie, @PathVariable int movieId, HttpServletResponse response){
        setResponse(response, movieService.editMovie(updatedMovie ,movieId));
    }

    @RequestMapping(value = "/movieId/{movieId}", method = RequestMethod.DELETE)
    public void deleteMovie(@PathVariable int movieId, HttpServletResponse response){
        setResponse(response, movieService.deleteMovie(movieId));
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    Movie getMovieById(@PathVariable int id){
        return movieService.getMovieById(id);
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
