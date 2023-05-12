package com.bestmovies.sep6_project.dao;

import com.bestmovies.sep6_project.model.Movie;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface MovieReaderMapper {

    @Select("select * from movies")
    List<Movie> findAll();
}
