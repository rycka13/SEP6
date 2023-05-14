package com.bestmovies.sep6_project.model;

public class Director {
    private Movie movie;
    private Person person;

    public Director(Movie movie, Person person) {
        this.movie = movie;
        this.person = person;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}
