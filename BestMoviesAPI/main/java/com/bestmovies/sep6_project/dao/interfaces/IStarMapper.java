package com.bestmovies.sep6_project.dao.interfaces;

import com.bestmovies.sep6_project.model.Star;

import java.util.List;

public interface IStarMapper {
    List<Star> getAll();
    void createStar(Star star);
    void updateStar(Star star);
    void deleteStar(long id);

    Star getStarById(long id);
}
