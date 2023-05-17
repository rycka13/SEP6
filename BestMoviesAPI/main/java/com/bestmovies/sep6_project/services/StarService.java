package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.dao.interfaces.IStarMapper;
import com.bestmovies.sep6_project.model.Star;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StarService {
    private IStarMapper starMapper;

    public List<Star> getAllStars(){
        return starMapper.getAll();
    }

    public Star getStarById(long id) {
        return starMapper.getStarById(id);
    }

    public boolean createStar(String name, int birthYear) {
        if (name != null && birthYear > 0){
            Star newStar = new Star(name, birthYear);
            starMapper.createStar(newStar);
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
}
