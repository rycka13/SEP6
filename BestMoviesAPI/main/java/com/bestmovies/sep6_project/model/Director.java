package com.bestmovies.sep6_project.model;

import java.util.List;

public class Director extends Person{
    public Director(){
    }
    public Director(int id, String name, int birthYear){
        super(id, name, birthYear);
    }
    public Director(String name, int birthYear){
        super(name, birthYear);
    }
    public Director(List<Movie> movies, int id, String name, int birthYear) {
        super(movies, id, name, birthYear);
    }
}
