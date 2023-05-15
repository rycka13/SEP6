package com.bestmovies.sep6_project.model;

import java.util.List;

public class Star extends Person {
    public Star(){
    }
    public Star(List<Movie> movies, int id, String name, int birthYear) {
        super(movies, id, name, birthYear);
    }
}
