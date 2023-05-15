package com.bestmovies.sep6_project.model;

import java.util.List;

public class Director extends Person{
    public Director(){
    }

    public Director(List<Movie> movies, int id, String name, int birthYear) {
        super(movies, id, name, birthYear);
    }
}
