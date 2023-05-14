package com.bestmovies.sep6_project.dao;

import com.bestmovies.sep6_project.dao.interfaces.MovieReaderMapper;
import com.bestmovies.sep6_project.model.Movie;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.Reader;
import java.util.List;

public class MovieDao {

    private MovieReaderMapper movieReaderMapper;
    
    public MovieDao() throws IOException {
        String resource = "Mapper.xml";
            Reader reader = Resources.getResourceAsReader(resource);
            SqlSessionFactory sqlSessionFactory =
                    new SqlSessionFactoryBuilder().build(reader);
            SqlSession session = sqlSessionFactory.openSession();
            movieReaderMapper = session.getMapper(MovieReaderMapper.class);
    }
    public List<Movie> getAllMovies(){
        return movieReaderMapper.getAll();
    }



}
