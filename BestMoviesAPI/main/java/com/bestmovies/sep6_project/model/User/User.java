package com.bestmovies.sep6_project.model.User;

import com.bestmovies.sep6_project.model.Hash.HashPair;

public class User {
    private long id;
    private String userName;
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private HashPair hashedPassword;

    public HashPair getHashedPassword() {
        return hashedPassword;
    }

    public void setHashedPassword(HashPair hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}
