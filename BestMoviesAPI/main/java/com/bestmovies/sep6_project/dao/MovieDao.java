package com.bestmovies.sep6_project.dao;

import com.bestmovies.sep6_project.dao.interfaces.MovieReaderMapper;
import com.bestmovies.sep6_project.dao.interfaces.RatingReaderMapper;
import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.model.Rating;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.Reader;
import java.util.List;

public class MovieDao {

    private MovieReaderMapper movieReaderMapper;
    private RatingReaderMapper ratingReaderMapper;
    
    public MovieDao() throws IOException {
        String resource = "Mapper.xml";
            Reader reader = Resources.getResourceAsReader(resource);
            SqlSessionFactory sqlSessionFactory =
                    new SqlSessionFactoryBuilder().build(reader);
            SqlSession session = sqlSessionFactory.openSession();
            movieReaderMapper = session.getMapper(MovieReaderMapper.class);
            ratingReaderMapper = session.getMapper(RatingReaderMapper.class);
    }
    public List<Movie> getAllMovies(){
        return movieReaderMapper.getAll();
    }
    public List<Rating> getAllRatings(){
        return ratingReaderMapper.getAll();
    }



}
