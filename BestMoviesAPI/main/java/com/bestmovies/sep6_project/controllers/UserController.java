package com.bestmovies.sep6_project.controllers;

import com.bestmovies.sep6_project.model.User.User;
import com.bestmovies.sep6_project.services.UserService;
import com.bestmovies.sep6_project.services.enums.ResponseMessage;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @RequestMapping(value = "/register", method = RequestMethod.POST, consumes="application/json")
    public void registerUser(@RequestBody User user, HttpServletResponse response) throws IOException {
        ResponseMessage responseMessage = userService.registerUser(user);
        switch (responseMessage) {
            case SUCCESS -> setResponse(response, true);
            case WRONG_PASSWORD -> response.sendError(401, "Password does not match");
            default -> response.sendError(500, "Internal server error");
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes="application/json")
    public void loginUser(@RequestBody User user, HttpServletResponse response) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException {
        ResponseMessage responseMessage = userService.loginUser(user);
        switch (responseMessage) {
            case SUCCESS -> setResponse(response, true);
            case PASSWORD_ERROR -> response.sendError(401, "Make sure the password matches requirements");
            case EXISTING_USER -> response.sendError(401, "User already exist");
            default -> response.sendError(500, "Internal server error");
        }
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
