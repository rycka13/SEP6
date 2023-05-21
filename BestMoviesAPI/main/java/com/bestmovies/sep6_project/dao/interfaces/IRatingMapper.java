package com.bestmovies.sep6_project.dao.interfaces;

import com.bestmovies.sep6_project.model.Rating;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface IRatingMapper {
    List<Rating> getAll();
    void createRating(Rating rating);
    void updateRating(Rating rating);
    void deleteRating(long id);
    Rating getRatingByMovieId(long id);
}
