package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.model.Movie;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MovieService {
    private MovieDao dao;

    public MovieService(){
        try {
            dao = new MovieDao();
        }
        catch (Exception e){
            System.out.println(e.getStackTrace());
        }
    }

    public List<Movie> getAllMovies(){
        return dao.getAllMovies();
    }

    public Movie getMovieById(long id) {
        return dao.getMovieById(id);
    }

    public boolean createMovie(long id, String title, int year) {
        Movie newMovie = new Movie(id, title, year);

        return false;
    }

    public boolean editMovie(Movie updatedMovie, long movieId) {
        return true;
    }

    public boolean deleteMovie(long movieId) {
        return true;
    }
}
