package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.dao.interfaces.IDirectorMapper;
import com.bestmovies.sep6_project.model.Director;
import com.bestmovies.sep6_project.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DirectorService {

    @Autowired
    private IDirectorMapper directorMapper;

    public List<Director> getAllDirectors(){
        return directorMapper.getAll();
    }

    public Director getDirectorById(long id) {
        return directorMapper.getByDirectorId(id);
    }

    public boolean createDirector(String name, int birthYear) {
        if(name != null && birthYear > 0){
        Director newDirector = new Director(name,birthYear);
            directorMapper.createDirector(newDirector);
            return true;
        }
        return false;
    }

    public boolean editDirector(Director updatedDirector, long personId) {
        if(updatedDirector != null && personId > 0){
            updatedDirector.setId(personId);
            directorMapper.updateDirector(updatedDirector);
            return true;
        }
        return false;
    }

    public boolean deleteDirector(long personId) {
        if(personId > 0){
            directorMapper.deleteDirector(personId);
            return true;
        }
        return false;
    }
}
