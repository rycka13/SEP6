package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.dao.interfaces.IStarMapper;
import com.bestmovies.sep6_project.model.Star;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StarService {
    @Autowired
    private IStarMapper starMapper;

    public List<Star> getAllStars(){
        return starMapper.getAll();
    }

    public Star getStarById(long id) {
        return starMapper.getStarById(id);
    }

    public boolean createStar(Star star) {
        if (star.getName() != null && star.getBirthYear() > 0){
            starMapper.createStar(star);
            return true;
        }
        return false;
    }

    public boolean editStar(Star updatedStar, long personId) {
        if (updatedStar != null && personId > 0){
            updatedStar.setId(personId);
            starMapper.updateStar(updatedStar);
            return true;
        }
        return false;
    }

    public boolean deleteStar(long personId) {
        if (personId > 0){
            starMapper.deleteStar(personId);
            return true;
        }
        return false;
    }

    public List<Star> getByMovieId(long movieId){
        if(movieId > 0){
            return starMapper.getByMovieId(movieId);
        }
        return null;
    }

    public List<Star> getStarsByBirth(int birth){
        if(birth > 0){
            return starMapper.getStarsByBirth(birth);
        }
        return null;
    }

    public List<Star> getStarsByName(String name){
        if(name != null){
            return starMapper.getStarsByName(name);
        }
        return null;
    }

    public boolean addMovieStar(Star star){
        if(star != null){
            starMapper.addMovieStar(star);
            return true;
        }
        return false;
    }
}
