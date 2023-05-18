package com.bestmovies.sep6_project.controllers;

import com.bestmovies.sep6_project.model.Star;
import com.bestmovies.sep6_project.services.StarService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/star")
public class StarController {

    @Autowired
    StarService starService;

    @RequestMapping(value = "/save", method = RequestMethod.POST, consumes="application/json")
    public void createStar(@RequestBody Star star, HttpServletResponse response){
        setResponse(response, starService.createStar(star));
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    List<Star> getAllStars(){
        return starService.getAllStars();
    }

    @RequestMapping(value = "/personId/{personId}", method = RequestMethod.PUT, consumes="application/json")
    public void updateMovie(@RequestBody Star updatedStar, @PathVariable long personId, HttpServletResponse response){
        setResponse(response, starService.editStar(updatedStar ,personId));
    }

    @RequestMapping(value = "/personId/{personId}", method = RequestMethod.DELETE)
    public void deleteStar(@PathVariable long personId, HttpServletResponse response){
        setResponse(response, starService.deleteStar(personId));
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    Star getStarById(@PathVariable long id){
        return starService.getStarById(id);
    }

    @RequestMapping(value = "/movieId/{movieId}", method = RequestMethod.GET)
    public List<Star> getByMovieId(@PathVariable long movieId){
        return starService.getByMovieId(movieId);
    }

    @RequestMapping(value = "/year/{year}", method = RequestMethod.GET)
    public List<Star> getStarsByBirth(@PathVariable int year){
        return starService.getStarsByBirth(year);
    }

    @RequestMapping(value = "/name/{name}", method = RequestMethod.GET)
    public List<Star> getStarsByName(@PathVariable String name){
        return starService.getStarsByName(name);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes="application/json")
    public void addMovieStar(@RequestBody Star star, HttpServletResponse response){
        setResponse(response, starService.addMovieStar(star));
    }

    public void setResponse(HttpServletResponse response, boolean success){
        if(success){
            response.setStatus(HttpStatus.SC_OK);
        }
        else {
            response.setStatus(HttpStatus.SC_BAD_REQUEST);
        }
    }
}
