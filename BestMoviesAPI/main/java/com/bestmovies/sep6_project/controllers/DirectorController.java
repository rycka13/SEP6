package com.bestmovies.sep6_project.controllers;

import com.bestmovies.sep6_project.model.Director;
import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.services.DirectorService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/director")
public class DirectorController {
    @Autowired
    DirectorService directorService;

    @RequestMapping(value = "/save", method = RequestMethod.POST, consumes="application/json")
    public void addDirector(@RequestBody Director director, HttpServletResponse response){
        setResponse(response, directorService.createDirector(director.getId(), director.getName(), director.getBirthYear()));
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    List<Director> getAllDirectors(){
        return directorService.getAllDirectors();
    }

    @RequestMapping(value = "/directorId/{directorId}", method = RequestMethod.PUT, consumes="application/json")
    public void updateMovie(@RequestBody Director updatedDirector, @PathVariable int directorId, HttpServletResponse response){
        setResponse(response, directorService.editDirector(updatedDirector ,directorId));
    }

    @RequestMapping(value = "/directorId/{directorId}", method = RequestMethod.DELETE)
    public void deleteDirector(@PathVariable int directorId, HttpServletResponse response){
        setResponse(response, directorService.deleteDirector(directorId));
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    Director getDirectorById(@PathVariable int id){
        return directorService.getDirectorById(id);
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
