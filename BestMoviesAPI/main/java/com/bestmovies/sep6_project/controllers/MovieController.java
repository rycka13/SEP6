package com.bestmovies.sep6_project.controllers;

import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.services.MovieService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/movie")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @RequestMapping(value = "/save", method = RequestMethod.POST, consumes = "application/json")
    public void addMovie(@RequestBody Movie movie, HttpServletResponse response) {
        setResponse(response, movieService.createMovie(movie));
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @RequestMapping(value = "/movieId/{movieId}", method = RequestMethod.PUT, consumes = "application/json")
    public void updateMovie(@RequestBody Movie updatedMovie, @PathVariable int movieId, HttpServletResponse response) {
        setResponse(response, movieService.editMovie(updatedMovie, movieId));
    }

    @RequestMapping(value = "/movieId/{movieId}", method = RequestMethod.DELETE)
    public void deleteMovie(@PathVariable int movieId, HttpServletResponse response) {
        setResponse(response, movieService.deleteMovie(movieId));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    Movie getMovieById(@PathVariable int id) {
        return movieService.getMovieById(id);
    }

    @RequestMapping(value = "/rating/{rating}/{n}", method = RequestMethod.GET)
    public List<Movie> getNMoviesByRating(@PathVariable double rating, @PathVariable int n) {
        return movieService.getNMoviesByRating(rating, n);
    }

    @RequestMapping(value = "/votes/{votes}/{n}", method = RequestMethod.GET)
    public List<Movie> getNMoviesByVotes(@PathVariable int votes, @PathVariable int n) {
        return movieService.getNMoviesByVotes(votes, n);
    }

    @RequestMapping(value = "/directorId/{personId}", method = RequestMethod.GET)
    public List<Movie> getAllMoviesForDirector(@PathVariable int personId) {
        return movieService.getAllMoviesForDirector(personId);
    }

    @RequestMapping(value = "/starId/{personId}", method = RequestMethod.GET)
    public List<Movie> getAllMoviesForStar(@PathVariable int personId) {
        return movieService.getAllMoviesForStar(personId);
    }

    @RequestMapping(value = "/top/{personId}", method = RequestMethod.GET)
    public List<Movie> getTopFiveMoviesForPerson(@PathVariable int personId) {
        return movieService.getTopFiveMoviesForPerson(personId);
    }

    @RequestMapping(value = "/year/{year}/{n}", method = RequestMethod.GET)
    public List<Movie> getNMoviesByYear(@PathVariable int year, @PathVariable int n) {
        return movieService.getNMoviesByYear(year, n);
    }

    @RequestMapping(value = "/year/{year}", method = RequestMethod.GET)
    public List<Movie> getMoviesByYear(@PathVariable int year) {
        return movieService.getMoviesByYear(year);
    }

    @RequestMapping(value = "/popular/{n}", method = RequestMethod.GET)
    public List<Movie> getNMostPopularMovies(@PathVariable int n) {
        return movieService.getNMostPopularMovies(n);
    }

    @RequestMapping(value = "/rating/{n}", method = RequestMethod.GET)
    public List<Movie> getNBestRatedMovies(@PathVariable int n) {
        return movieService.getNBestRatedMovies(n);
    }

    @RequestMapping(value = "/title/{title}", method = RequestMethod.GET)
    public List<Movie> getNBestRatedMovies(@PathVariable String title) {
        return movieService.getMoviesByTitle(title);
    }

    @RequestMapping(value = "/page/{pageNr}/{n}", method = RequestMethod.GET)
    public List<Movie> getPageOfMovies(@PathVariable int pageNr, @PathVariable int n) {
        return movieService.getPageOfMovies(pageNr, n);
    }

    @RequestMapping(value = "/{id}/{username}", method = RequestMethod.GET)
    Movie getMovieById(@PathVariable int id, @PathVariable String username) {
        return movieService.getMovieByIdWithUserRating(id, username);
    }

    public void setResponse(HttpServletResponse response, boolean success) {
        if (success) {
            response.setStatus(HttpStatus.SC_OK);
        } else {
            response.setStatus(HttpStatus.SC_BAD_REQUEST);
        }
    }
}
