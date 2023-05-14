package com.bestmovies.sep6_project.model;

public class Director extends Person{

    public Director(){
        super(null,1,null,1);
    }

    public Director(Movie movie, int id, String name, int birthYear) {
        super(movie, id, name, birthYear);
    }
}
