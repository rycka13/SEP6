package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.dao.interfaces.IDirectorMapper;
import com.bestmovies.sep6_project.model.Director;
import com.bestmovies.sep6_project.model.external.PersonResult;
import com.bestmovies.sep6_project.restclient.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DirectorService {

    @Autowired
    private IDirectorMapper directorMapper;

    @Autowired
    private RestClient restClient;

    private final String pictureUrl = "https://image.tmdb.org/t/p/original";

    public List<Director> getAllDirectors() {
        List<Director> directors = directorMapper.getAll();
        setMultipleDirectorsPictures(directors);
        return directors;
    }

    public Director getDirectorById(long id) {
        Director director = directorMapper.getDirectorById(id);
        setDirectorPicture(director);
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
            setMultipleDirectorsPictures(directors);
            return directors;
        }
        return null;
    }

    public List<Director> getDirectorsByName(String name) {
        if (name != null){
            List<Director> directors = directorMapper.getDirectorsByName(name);
            setMultipleDirectorsPictures(directors);
            return directors;
        }
        return null;
    }

    public List<Director> getPageOfDirectors(int pageNr, int n) {
        if(pageNr>0 && n>0){
            List<Director> directors = directorMapper.getNDirectorsByPage(pageNr, n);
            setMultipleDirectorsPictures(directors);
            return directors;
        }
        return null;
    }

    private void setDirectorPicture(Director director){
        PersonResult personResult = restClient.getAllPersonsByName(director.getName());
        if(personResult != null && !personResult.getResults().isEmpty()){
            director.setProfilePicture(pictureUrl + personResult.getResults().get(0).getProfile_path());
        }
        else {
            director.setProfilePicture(null);
        }
    }

    private void setMultipleDirectorsPictures(List<Director> allDirectors){
        for (Director d : allDirectors) {
            setDirectorPicture(d);
        }
    }
}
