package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.dao.MovieDao;
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

    public Movie getMovieById(int id) {
        return dao.getMovieById(id);
    }

    public boolean createMovie(int id, String title, int year) {
        Movie newMovie = new Movie();
        newMovie.setId(id);
        newMovie.setTitle(title);
        newMovie.setYear(year);

        return false;
    }

    public boolean editMovie(Movie updatedMovie, int movieId) {
        return true;
    }

    public boolean deleteMovie(int movieId) {
        return true;
    }
}
