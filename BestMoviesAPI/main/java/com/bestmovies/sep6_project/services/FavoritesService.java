package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.dao.interfaces.IFavoritesMapper;
import com.bestmovies.sep6_project.dao.interfaces.IUserMapper;
import com.bestmovies.sep6_project.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FavoritesService {
    @Autowired
    private IFavoritesMapper favoritesMapper;
    @Autowired
    private IUserMapper userMapper;

    public boolean addMovieToFavorites(String userName, long movieId){
        if(userName != null){
            long userId = userMapper.getUserByUsername(userName).getId();
            if(userId > 0){
                favoritesMapper.addMovieToFavorites(userId, movieId);
                return true;
            }
        }
        return false;
    }
    public boolean addMoviesToFavoritesWithRating(String userName, long movieId, int rating){
        if(userName != null){
            long userId = userMapper.getUserByUsername(userName).getId();
            if(userId > 0 && rating > 0 && rating < 11){
                favoritesMapper.addMoviesToFavoritesWithRating(userId, movieId, rating);
                return true;
            }
        }
        return false;
    }
    public boolean addRatingToMovie(String userName, long movieId, int rating){
        if(userName != null){
            long userId = userMapper.getUserByUsername(userName).getId();
            if(userId > 0 && rating > 0 && rating < 11){
                favoritesMapper.addRatingToMovie(userId, movieId, rating);
                return true;
            }
        }
        return false;
    }
    public boolean removeRatingFromMovie(String userName, long movieId){
        if(userName != null){
            long userId = userMapper.getUserByUsername(userName).getId();
            if(userId > 0){
                favoritesMapper.removeRatingFromMovie(userId, movieId);
                return true;
            }
        }
        return false;
    }
    public boolean removeMovieFromFavorites(String userName, long movieId){
        if(userName != null){
            long userId = userMapper.getUserByUsername(userName).getId();
            if(userId > 0){
                favoritesMapper.removeMovieFromFavorites(userId, movieId);
                return true;
            }
        }
        return false;
    }
    public List<Movie> getFavorites(String userName){
        if (userName != null){
            long userId = userMapper.getUserByUsername(userName).getId();
            if(userId > 0){
                return favoritesMapper.getFavorites(userId);
            }
        }
        return null;
    }
}
