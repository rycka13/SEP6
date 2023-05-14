package com.bestmovies.sep6_project.dao;

import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.model.Person;

import java.util.List;

public interface MovieReaderMapper {

    List<Movie> getAll();
}
