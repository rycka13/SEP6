package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.dao.interfaces.IFavoritesMapper;
import com.bestmovies.sep6_project.dao.interfaces.IMovieMapper;
import com.bestmovies.sep6_project.dao.interfaces.IUserMapper;
import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.model.external.movies.ExternalMovie;
import com.bestmovies.sep6_project.restclient.RestClient;
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
    private RestClient restClient;

    private final String pictureUrl = "https://image.tmdb.org/t/p/original";

    public List<Movie> getAllMovies() {
        List<Movie> allMovies = movieMapper.getAll();
        setMultipleMoviesImages(allMovies);
        setMultipleMoviesDescriptions(allMovies);
        return allMovies;
    }

    public Movie getMovieById(long id) {
        Movie movieById = movieMapper.getMovieById(id);
        setMovieImages(movieById);
        setMovieDescription(movieById);
        return movieById;
    }

    public Movie getMovieByIdWithUserRating(long id, String userName) {
        Movie movieById = movieMapper.getMovieById(id);
        setMovieImages(movieById);
        setMovieDescription(movieById);
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
            setMultipleMoviesImages(movies);
            setMultipleMoviesDescriptions(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getNMoviesByVotes(int votes, int n) {
        if (votes > 0 && n > 0) {
            List<Movie> movies = movieMapper.getNMoviesByVotes(votes, n);
            setMultipleMoviesImages(movies);
            setMultipleMoviesDescriptions(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getAllMoviesForDirector(long id) {
        if (id > 0) {
            List<Movie> movies = movieMapper.getAllMoviesForDirector(id);
            setMultipleMoviesImages(movies);
            setMultipleMoviesDescriptions(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getAllMoviesForStar(long id) {
        if (id > 0) {
            List<Movie> movies = movieMapper.getAllMoviesForStar(id);
            setMultipleMoviesImages(movies);
            setMultipleMoviesDescriptions(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getNMoviesByYear(int year, int n) {
        if (year > 0 && n > 0) {
            List<Movie> movies = movieMapper.getNMoviesByYear(year, n);
            setMultipleMoviesImages(movies);
            setMultipleMoviesDescriptions(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getMoviesByYear(int year) {
        if (year > 0) {
            List<Movie> movies = movieMapper.getMoviesByYear(year);
            setMultipleMoviesImages(movies);
            setMultipleMoviesDescriptions(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getNMostPopularMovies(int n) {
        if (n > 0) {
            List<Movie> movies = movieMapper.getNMostPopularMovies(n);
            setMultipleMoviesImages(movies);
            setMultipleMoviesDescriptions(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getNBestRatedMovies(int n) {
        if (n > 0) {
            List<Movie> movies = movieMapper.getNBestRatedMovies(n);
            setMultipleMoviesImages(movies);
            setMultipleMoviesDescriptions(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getMoviesByTitle(String title) {
        if (title != null) {
            List<Movie> movies = movieMapper.getMoviesByTitle(title);
            setMultipleMoviesImages(movies);
            setMultipleMoviesDescriptions(movies);
            return movies;
        }
        return null;
    }

    public List<Movie> getPageOfMovies(int pageNr, int n) {
        if (pageNr > 0 && n > 0) {
            List<Movie> pagedMovies = movieMapper.getNMoviesByPage(pageNr, n);
            setMultipleMoviesImages(pagedMovies);
            setMultipleMoviesDescriptions(pagedMovies);
            return pagedMovies;
        }
        return null;
    }

    private void setMovieImages(Movie movie) {
        ExternalMovie movieResult = restClient.getAllMoviesByName(movie.getId());
        if (movieResult != null) {
            String posterPath = movieResult.getPoster_path();
            String backgroundPath = movieResult.getBackdrop_path();
            if (posterPath != null) {
                movie.setPosterImage(pictureUrl + posterPath);
            }
            if (backgroundPath != null) {
                movie.setBackgroundImage(pictureUrl + backgroundPath);
            }


        } else {
            movie.setPosterImage(null);
            movie.setBackgroundImage(null);
        }
    }

    private void setMultipleMoviesImages(List<Movie> allMovies) {
        for (Movie m : allMovies) {
            setMovieImages(m);
        }
    }

    private void setMovieDescription(Movie movie) {
        ExternalMovie movieResult = restClient.getAllMoviesByName(movie.getId());
        if (movieResult != null) {
            movie.setDescription(movieResult.getOverview());
        } else {
            movie.setDescription(null);
        }
    }

    private void setMultipleMoviesDescriptions(List<Movie> allMovies) {
        for (Movie m : allMovies) {
            setMovieDescription(m);
        }
    }

}
