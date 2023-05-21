package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.dao.interfaces.IStarMapper;
import com.bestmovies.sep6_project.model.PersonResult;
import com.bestmovies.sep6_project.model.Star;
import com.bestmovies.sep6_project.restclient.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StarService {
    @Autowired
    private IStarMapper starMapper;

    @Autowired
    private RestClient restClient;

    private final String pictureUrl = "https://image.tmdb.org/t/p/original";

    public List<Star> getAllStars(){
        List<Star> stars = starMapper.getAll();
        setMultipleStarsPictures(stars);
        return stars;
    }

    public Star getStarById(long id) {
        Star star = starMapper.getStarById(id);
        setStarPicture(star);
        return star;
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
            List<Star> stars = starMapper.getByMovieId(movieId);
            setMultipleStarsPictures(stars);
            return stars;
        }
        return null;
    }

    public List<Star> getStarsByBirth(int birth){
        if(birth > 0){
            List<Star> stars = starMapper.getStarsByBirth(birth);
            setMultipleStarsPictures(stars);
            return stars;
        }
        return null;
    }

    public List<Star> getStarsByName(String name){
        if(name != null){
            List<Star> stars = starMapper.getStarsByName(name);
            setMultipleStarsPictures(stars);
            return stars;
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

    private void setStarPicture(Star star){
        PersonResult personResult = restClient.getAllPersonsByName(star.getName());
        if(personResult != null && !personResult.getResults().isEmpty()){
            star.setProfilePicture(pictureUrl + personResult.getResults().get(0).getProfile_path());
        }
        else {
            star.setProfilePicture(null);
        }
    }

    private void setMultipleStarsPictures(List<Star> allStars){
        for (Star s : allStars) {
            setStarPicture(s);
        }
    }
}
