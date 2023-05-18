package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.dao.interfaces.IMovieMapper;
import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.model.MovieResult;
import com.bestmovies.sep6_project.restclient.MovieRestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MovieService {

    @Autowired
    private IMovieMapper movieMapper;

    @Autowired
    private MovieRestClient movieRestClient;

    private final String pictureUrl = "https://image.tmdb.org/t/p/original/";

    public List<Movie> getAllMovies(){
        List<Movie> allMovies = movieMapper.getAll();
        MovieResult result;
        for (Movie m : allMovies) {
            result = movieRestClient.getAllByName(m.getTitle());
            setMovieImages(m, result);
        }

        return allMovies;
    }

    public Movie getMovieById(long id) {
        Movie movieById = movieMapper.getMovieById(id);
        MovieResult movieResult= movieRestClient.getAllByName(movieById.getTitle());
        setMovieImages(movieById, movieResult);
        return movieMapper.getMovieById(id);
    }

    private void setMovieImages(Movie movie, MovieResult movieResult) {
        if(movieResult != null && !movieResult.getResults().isEmpty()){
            movie.setPosterImage(pictureUrl + movieResult.getResults().get(0).getPoster_path());
            movie.setBackgroundImage(pictureUrl + movieResult.getResults().get(0).getBackdrop_path());
        }
        else {
            movie.setPosterImage(null);
            movie.setBackgroundImage(null);
        }
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
