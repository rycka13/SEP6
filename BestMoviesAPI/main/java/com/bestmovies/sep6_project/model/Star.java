package com.bestmovies.sep6_project.model;

import java.util.List;

public class Star extends Person {
    public Star(){
    }
    public Star(long id, String name, int birthYear){
        super(id, name, birthYear);
    }
    public Star(String name, int birthYear){
        super(name, birthYear);
    }
    public Star(List<Movie> movies, long id, String name, int birthYear) {
        super(movies, id, name, birthYear);
    }
}
