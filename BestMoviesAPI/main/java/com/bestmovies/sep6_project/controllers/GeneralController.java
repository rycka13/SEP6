package com.bestmovies.sep6_project.controllers;

import jakarta.servlet.http.HttpServletResponse;
import org.apache.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GeneralController {
    @RequestMapping(value = "/ping", method = RequestMethod.GET)
    public void ping(HttpServletResponse response){
        setResponse(response, true);
    }

    public void setResponse(HttpServletResponse response, boolean success){
        if(success){
            response.setStatus(211);
        }
        else {
            response.setStatus(HttpStatus.SC_UNAUTHORIZED);
        }
    }
}
