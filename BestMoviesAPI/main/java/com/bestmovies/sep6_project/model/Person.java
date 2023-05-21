package com.bestmovies.sep6_project.model;

import java.util.List;

public abstract class Person {
    private Movie addMovie;
    private List<Movie> movies;  // Change the type to List<Movie> for one-to-many relationship
    private long id;
    private String name;
    private int birthYear;
    private String profilePicture;

    public Person(){}
    public Person(String name, int birthYear) {
        this.name = name;
        this.birthYear = birthYear;
    }
    public Person(long id, String name, int birthYear) {
        this.id = id;
        this.name = name;
        this.birthYear = birthYear;
    }
    public Person(List<Movie> movies, long id, String name, int birthYear) {
        this.movies = movies;
        this.id = id;
        this.name = name;
        this.birthYear = birthYear;
    }

    public Person(Movie addMovie, long id, String name, int birthYear) {
        this.addMovie = addMovie;
        this.id = id;
        this.name = name;
        this.birthYear = birthYear;
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getBirthYear() {
        return birthYear;
    }

    public void setBirthYear(int birthYear) {
        this.birthYear = birthYear;
    }

    public void setAddMovie(Movie addMovie) {
        this.addMovie = addMovie;
    }

    public Movie getAddMovie() {
        return addMovie;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}
