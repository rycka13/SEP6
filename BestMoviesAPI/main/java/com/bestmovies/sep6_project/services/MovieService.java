package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.dao.interfaces.IFavoritesMapper;
import com.bestmovies.sep6_project.dao.interfaces.IMovieMapper;
import com.bestmovies.sep6_project.dao.interfaces.IUserMapper;
import com.bestmovies.sep6_project.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MovieService {

    @Autowired
    private IMovieMapper movieMapper;

    @Autowired
    private IFavoritesMapper favoritesMapper;

    @Autowired
    private IUserMapper userMapper;

    @Autowired
    private ServiceUtils utils;

    public List<Movie> getAllMovies() {
        List<Movie> allMovies = movieMapper.getAll();
        utils.setParametersForMultipleMovies(allMovies);
        return allMovies;
    }

    public Movie getMovieById(long id) {
        Movie movieById = movieMapper.getMovieById(id);
        utils.setParametersForMovies(movieById);
        return movieById;
    }

    public Movie getMovieByIdWithUserRating(long id, String userName) {
        Movie movieById = movieMapper.getMovieById(id);
        utils.setParametersForMovies(movieById);
        long userId = userMapper.getUserByUsername(userName).getId();
        movieById.setUserRating(favoritesMapper.getRatingByMovieId(userId, movieById.getId()));
        return movieById;
    }

    public boolean createMovie(Movie movie) {
        if (movie.getTitle() != null && movie.getYear() > 0) {
            movieMapper.createMovie(movie);
            return true;
        }

        return false;
    }

    public boolean editMovie(Movie updatedMovie, long movieId) {
        if (updatedMovie != null && movieId > 0) {
            updatedMovie.setId(movieId);
            movieMapper.updateMovie(updatedMovie);
            return true;
        }
        return false;
    }

    public boolean deleteMovie(long movieId) {
        if (movieId > 0) {
            movieMapper.deleteMovie(movieId);
            return true;
        }
        return false;
    }

    public List<Movie> getNMoviesByRating(double rating, int n) {
        if (rating > 0 && n > 0) {
            List<Movie> movies = movieMapper.getNMoviesByRating(rating, n);
            utils.setParametersForMultipleMovies(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getNMoviesByVotes(int votes, int n) {
        if (votes > 0 && n > 0) {
            List<Movie> movies = movieMapper.getNMoviesByVotes(votes, n);
            utils.setParametersForMultipleMovies(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getAllMoviesForDirector(long id) {
        if (id > 0) {
            List<Movie> movies = movieMapper.getAllMoviesForDirector(id);
            utils.setParametersForMultipleMovies(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getAllMoviesForStar(long id) {
        if (id > 0) {
            List<Movie> movies = movieMapper.getAllMoviesForStar(id);
            utils.setParametersForMultipleMovies(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getTopFiveMoviesForPerson(long id) {
        if (id > 0) {
            List<Movie> movies = movieMapper.getTopFiveMoviesForPerson(id);
            utils.setParametersForMultipleMovies(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getNMoviesByYear(int year, int n) {
        if (year > 0 && n > 0) {
            List<Movie> movies = movieMapper.getNMoviesByYear(year, n);
            utils.setParametersForMultipleMovies(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getMoviesByYear(int year) {
        if (year > 0) {
            List<Movie> movies = movieMapper.getMoviesByYear(year);
            utils.setParametersForMultipleMovies(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getNMostPopularMovies(int n) {
        if (n > 0) {
            List<Movie> movies = movieMapper.getNMostPopularMovies(n);
            utils.setParametersForMultipleMovies(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getNBestRatedMovies(int n) {
        if (n > 0) {
            List<Movie> movies = movieMapper.getNBestRatedMovies(n);
            utils.setParametersForMultipleMovies(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getMoviesByTitle(String title) {
        if (title != null) {
            List<Movie> movies = movieMapper.getMoviesByTitle(title);
            utils.setParametersForMultipleMovies(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getPageOfMovies(int pageNr, int n) {
        if (pageNr > 0 && n > 0) {
            List<Movie> pagedMovies = movieMapper.getNMoviesByPage(pageNr, n);
            utils.setParametersForMultipleMovies(pagedMovies);
            return pagedMovies;
        }
        return null;
    }

}
