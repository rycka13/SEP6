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
    public void addStar(@RequestBody Star star, HttpServletResponse response){
        setResponse(response, starService.createStar(star.getId(), star.getName(), star.getBirthYear()));
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    List<Star> getAllStars(){
        return starService.getAllStars();
    }

    @RequestMapping(value = "/starId/{starId}", method = RequestMethod.PUT, consumes="application/json")
    public void updateMovie(@RequestBody Star updatedStar, @PathVariable long starId, HttpServletResponse response){
        setResponse(response, starService.editStar(updatedStar ,starId));
    }

    @RequestMapping(value = "/starId/{starId}", method = RequestMethod.DELETE)
    public void deleteStar(@PathVariable long starId, HttpServletResponse response){
        setResponse(response, starService.deleteStar(starId));
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    Star getStarById(@PathVariable long id){
        return starService.getStarById(id);
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
