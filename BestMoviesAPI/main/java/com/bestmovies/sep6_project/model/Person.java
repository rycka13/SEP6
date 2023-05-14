package com.bestmovies.sep6_project.model;

public abstract class Person {
    private Movie movie;
    private int id;
    private String name;
    private int birthYear;

    public Person(){

    }

    public Person(Movie movie, int id, String name, int birthYear) {
        this.movie = movie;
        this.id = id;
        this.name = name;
        this.birthYear = birthYear;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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
}
