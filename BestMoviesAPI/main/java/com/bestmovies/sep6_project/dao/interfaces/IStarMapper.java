package com.bestmovies.sep6_project.dao.interfaces;

import com.bestmovies.sep6_project.model.Star;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface IStarMapper {
    List<Star> getAll();
    List<Star> getByMovieId(long movieId);
    List<Star> getStarsByBirth(int birth);
    List<Star> getStarsByName(String name);
    List<Star> getNStarsByPage(int pageNum, int limit);
    Star getStarById(long id);
    void createStar(Star star);
    void updateStar(Star star);
    void deleteStar(long id);
    void addMovieStar(Star star);
}
