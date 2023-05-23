package com.bestmovies.sep6_project.controllers;

import com.bestmovies.sep6_project.model.Director;
import com.bestmovies.sep6_project.services.DirectorService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/director")
public class DirectorController {
    @Autowired
    DirectorService directorService;

    @RequestMapping(value = "/save", method = RequestMethod.POST, consumes="application/json")
    public void addDirector(@RequestBody Director director, HttpServletResponse response){
        setResponse(response, directorService.createDirector(director));
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    List<Director> getAllDirectors(){
        return directorService.getAllDirectors();
    }

    @RequestMapping(value = "/personId/{personId}", method = RequestMethod.PUT, consumes="application/json")
    public void updateMovie(@RequestBody Director updatedDirector, @PathVariable long personId, HttpServletResponse response){
        setResponse(response, directorService.editDirector(updatedDirector ,personId));
    }

    @RequestMapping(value = "/personId/{personId}", method = RequestMethod.DELETE)
    public void deleteDirector(@PathVariable long personId, HttpServletResponse response){
        setResponse(response, directorService.deleteDirector(personId));
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    Director getDirectorById(@PathVariable long id){
        return directorService.getDirectorById(id);
    }

    @RequestMapping(value = "/birthYear/{birthYear}",method = RequestMethod.GET)
    List<Director> getDirectorsByBirth(@PathVariable int birthYear){
        return directorService.getDirectorsByBirth(birthYear);
    }

    @RequestMapping(value = "/name/{name}",method = RequestMethod.GET)
    List<Director> getDirectorsByName(@PathVariable String name){
        return directorService.getDirectorsByName(name);
    }

    @RequestMapping(value = "/page/{pageNr}/{n}", method = RequestMethod.GET)
    public List<Director> getPageOfDirectors(@PathVariable int pageNr, @PathVariable int n){
        return directorService.getPageOfDirectors(pageNr, n);
    }

    @RequestMapping(value = "/movieId/{movieId}", method = RequestMethod.GET)
    public List<Director> getPageOfDirectors(@PathVariable long movieId){
        return directorService.getDirectorsByMovieId(movieId);
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
