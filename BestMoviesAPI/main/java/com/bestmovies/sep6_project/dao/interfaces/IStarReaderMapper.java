package com.bestmovies.sep6_project.dao.interfaces;

import com.bestmovies.sep6_project.model.Person;
import com.bestmovies.sep6_project.model.Star;

import java.util.List;

public interface IStarReaderMapper {
    List<Star> getAll();
}
