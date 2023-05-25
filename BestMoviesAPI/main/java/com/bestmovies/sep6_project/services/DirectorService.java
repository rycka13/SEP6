package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.dao.interfaces.IDirectorMapper;
import com.bestmovies.sep6_project.model.Director;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DirectorService {

    @Autowired
    private IDirectorMapper directorMapper;
    @Autowired
    private ServiceUtils utils;

    public List<Director> getAllDirectors() {
        List<Director> directors = directorMapper.getAll();
        utils.setMultipleDirectorsPictures(directors);
        return directors;
    }

    public Director getDirectorById(long id) {
        Director director = directorMapper.getDirectorById(id);
        utils.setDirectorPicture(director);
        return director;
    }

    public boolean createDirector(Director director) {
        if (director.getName() != null && director.getBirthYear() > 0) {
            directorMapper.createDirector(director);
            return true;
        }
        return false;
    }

    public boolean editDirector(Director updatedDirector, long personId) {
        if (updatedDirector != null && personId > 0) {
            updatedDirector.setId(personId);
            directorMapper.updateDirector(updatedDirector);
            return true;
        }
        return false;
    }

    public boolean deleteDirector(long personId) {
        if (personId > 0) {
            directorMapper.deleteDirector(personId);
            return true;
        }
        return false;
    }

    public List<Director> getDirectorsByBirth(int birth) {
        if (birth > 0){
            List<Director> directors = directorMapper.getDirectorsByBirth(birth);
            utils.setMultipleDirectorsPictures(directors);
            return directors;
        }
        return null;
    }

    public List<Director> getDirectorsByName(String name) {
        if (name != null){
            List<Director> directors = directorMapper.getDirectorsByName(name);
            utils.setMultipleDirectorsPictures(directors);
            return directors;
        }
        return null;
    }

    public List<Director> getDirectorsByMovieId(long movieId) {
        if (movieId > 0){
            List<Director> directors = directorMapper.getByMovieId(movieId);
            utils.setMultipleDirectorsPictures(directors);
            return directors;
        }
        return null;
    }

    public List<Director> getPageOfDirectors(int pageNr, int n) {
        if(pageNr>0 && n>0){
            List<Director> directors = directorMapper.getNDirectorsByPage(pageNr, n);
            utils.setMultipleDirectorsPictures(directors);
            return directors;
        }
        return null;
    }
}
