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
        for (Movie m : allMovies) {
            setMovieImages(m);
        }

        return allMovies;
    }

    public Movie getMovieById(long id) {
        Movie movieById = movieMapper.getMovieById(id);
        setMovieImages(movieById);
        return movieMapper.getMovieById(id);
    }

    public boolean createMovie(Movie movie) {
        if(movie.getTitle() != null && movie.getYear() > 0){
            movieMapper.createMovie(movie);
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

    public List<Movie> getNMoviesByRating(double rating, int n){
        if(rating > 0 && n > 0){
            return setMultipleMoviesImages(movieMapper.getNMoviesByRating(rating, n));
        }
        return null;
    }

    public List<Movie> getNMoviesByVotes(int votes, int n){
        if(votes > 0 && n > 0){
            return setMultipleMoviesImages(movieMapper.getNMoviesByVotes(votes, n));
        }
        return null;
    }

    public List<Movie> getAllMoviesForDirector(long id){
        if(id > 0){
            return setMultipleMoviesImages(movieMapper.getAllMoviesForDirector(id));
        }
        return null;
    }

    public List<Movie> getAllMoviesForStar(long id){
        if(id > 0){
            return setMultipleMoviesImages(movieMapper.getAllMoviesForStar(id));
        }
        return null;
    }

    public List<Movie> getNMoviesByYear(int year, int n){
        if(year > 0 && n > 0){
            return setMultipleMoviesImages(movieMapper.getNMoviesByYear(year, n));
        }
        return null;
    }

    public List<Movie> getMoviesByYear(int year, int n){
        if(year > 0 && n > 0){
            return setMultipleMoviesImages(movieMapper.getMoviesByYear(year, n));
        }
        return null;
    }

    public List<Movie> getNMostPopularMovies(int n){
        if(n > 0){
            return setMultipleMoviesImages(movieMapper.getNMostPopularMovies(n));
        }
        return null;
    }

    public List<Movie> getNBestRatedMovies(int n){
        if(n > 0){
            return setMultipleMoviesImages(movieMapper.getNBestRatedMovies(n));
        }
        return null;
    }

    public List<Movie> getMoviesByTitle(String title){
        if(title != null){
            return setMultipleMoviesImages(movieMapper.getMoviesByTitle(title));
        }
        return null;
    }

    private void setMovieImages(Movie movie) {
        MovieResult movieResult= movieRestClient.getAllByName(movie.getTitle());
        if(movieResult != null && !movieResult.getResults().isEmpty()){
            movie.setPosterImage(pictureUrl + movieResult.getResults().get(0).getPoster_path());
            movie.setBackgroundImage(pictureUrl + movieResult.getResults().get(0).getBackdrop_path());
        }
        else {
            movie.setPosterImage(null);
            movie.setBackgroundImage(null);
        }
    }

    private List<Movie> setMultipleMoviesImages(List<Movie> allMovies){
        for (Movie m : allMovies) {
            setMovieImages(m);
        }
        return allMovies;
    }
}
