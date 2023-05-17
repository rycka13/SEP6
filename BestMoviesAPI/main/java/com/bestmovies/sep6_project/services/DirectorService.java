package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.dao.MovieDao;
import com.bestmovies.sep6_project.model.Director;
import com.bestmovies.sep6_project.model.Movie;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DirectorService {
    private MovieDao dao;

    public DirectorService(){
        try {
            dao = new MovieDao();
        }
        catch (Exception e){
            System.out.println(e.getStackTrace());
        }
    }

    public List<Director> getAllDirectors(){
        return dao.getAllDirectors();
    }

    public Director getDirectorById(long id) {
        return dao.getDirectorById(id);
    }

    public boolean createDirector(long id, String name, int birthYear) {
        return false;
    }

    public boolean editDirector(Director updatedDirector, long movieId) {
        return true;
    }

    public boolean deleteDirector(long directorId) {
        return true;
    }
}
