package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.dao.interfaces.IMovieMapper;
import com.bestmovies.sep6_project.model.Movie;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MovieService {

    private IMovieMapper movieMapper;

    public List<Movie> getAllMovies(){
        return movieMapper.getAll();
    }

    public Movie getMovieById(long id) {
        return movieMapper.getMovieById(id);
    }

    public boolean createMovie(String title, int year) {
        if(title != null && year > 0){
            Movie newMovie = new Movie(title, year);
            movieMapper.createMovie(newMovie);
            return true;
        }

        return false;
    }

    public boolean editMovie(Movie updatedMovie, long movieId) {
        if(updatedMovie != null && movieId > 0){
            updatedMovie.setId(movieId);
            movieMapper.updateMovie(updatedMovie);
            return true;
        }
        return false;
    }

    public boolean deleteMovie(long movieId) {
        if(movieId > 0){
            movieMapper.deleteMovie(movieId);
            return true;
        }
        return false;
    }
}
