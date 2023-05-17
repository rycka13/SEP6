package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.dao.MovieDao;
import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.model.Star;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StarService {
    private MovieDao dao;

    public StarService(){
        try {
            dao = new MovieDao();
        }
        catch (Exception e){
            System.out.println(e.getStackTrace());
        }
    }

    public List<Star> getAllStars(){
        return dao.getAllStars();
    }

    public Star getStarById(long id) {
        return dao.getStarById(id);
    }

    public boolean createStar(long id, String name, int birthYear) {

        return false;
    }

    public boolean editStar(Star updatedStar, long starId) {
        return true;
    }

    public boolean deleteStar(long starId) {
        return true;
    }
}
