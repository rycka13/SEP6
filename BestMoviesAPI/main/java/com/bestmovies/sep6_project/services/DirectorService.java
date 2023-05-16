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

    public Director getDirectorById(int id) {
        return dao.getDirectorById(id);
    }

    public boolean createDirector(int id, String name, int birthYear) {
        return false;
    }

    public boolean editDirector(Director updatedDirector, int movieId) {
        return true;
    }

    public boolean deleteDirector(int directorId) {
        return true;
    }
}
