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

    public List<Director> getAllDirectors() {
        return directorMapper.getAll();
    }

    public Director getDirectorById(long id) {
        return directorMapper.getDirectorById(id);
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
            return directorMapper.getDirectorsByBirth(birth);
        }
        return null;
    }

    public List<Director> getDirectorsByName(String name) {
        if (name != null){
            return directorMapper.getDirectorsByName(name);
        }
        return null;
    }
}
