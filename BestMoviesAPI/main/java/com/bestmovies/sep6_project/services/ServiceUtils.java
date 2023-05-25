package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.model.Director;
import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.model.Star;
import com.bestmovies.sep6_project.model.external.PersonResult;
import com.bestmovies.sep6_project.model.external.movies.ExternalMovie;
import com.bestmovies.sep6_project.restclient.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ServiceUtils {

    @Autowired
    private RestClient restClient;

    private final String pictureUrl = "https://image.tmdb.org/t/p/original";

    public void setParametersForMultipleMovies(List<Movie> allMovies){
        setMultipleMoviesImages(allMovies);
        setMultipleMoviesDescriptions(allMovies);
    }

    public void setParametersForMovies(Movie movie){
        setMovieImages(movie);
        setMovieDescription(movie);
    }

    public void setMovieImages(Movie movie) {
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

    public void setMultipleMoviesImages(List<Movie> allMovies) {
        for (Movie m : allMovies) {
            setMovieImages(m);
        }
    }

    public void setMovieDescription(Movie movie) {
        ExternalMovie movieResult = restClient.getAllMoviesByName(movie.getId());
        if (movieResult != null) {
            movie.setDescription(movieResult.getOverview());
        } else {
            movie.setDescription(null);
        }
    }

    public void setMultipleMoviesDescriptions(List<Movie> allMovies) {
        for (Movie m : allMovies) {
            setMovieDescription(m);
        }
    }

    public void setDirectorPicture(Director director){
        PersonResult personResult = restClient.getAllPersonsByName(director.getName());
        if(personResult != null && !personResult.getResults().isEmpty()){
            director.setProfilePicture(pictureUrl + personResult.getResults().get(0).getProfile_path());
        }
        else {
            director.setProfilePicture(null);
        }
    }

    public void setMultipleDirectorsPictures(List<Director> allDirectors){
        for (Director d : allDirectors) {
            setDirectorPicture(d);
        }
    }

    public void setStarPicture(Star star){
        PersonResult personResult = restClient.getAllPersonsByName(star.getName());
        if(personResult != null && !personResult.getResults().isEmpty()){
            star.setProfilePicture(pictureUrl + personResult.getResults().get(0).getProfile_path());
        }
        else {
            star.setProfilePicture(null);
        }
    }

    public void setMultipleStarsPictures(List<Star> allStars){
        for (Star s : allStars) {
            setStarPicture(s);
        }
    }
}
