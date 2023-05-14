package com.bestmovies.sep6_project.dao;

import com.bestmovies.sep6_project.dao.interfaces.IDirectorMapper;
import com.bestmovies.sep6_project.dao.interfaces.MovieReaderMapper;
import com.bestmovies.sep6_project.dao.interfaces.RatingReaderMapper;
import com.bestmovies.sep6_project.model.Director;
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
    private IDirectorMapper directorMapper;

    public MovieDao() throws IOException {
        String resource = "Mapper.xml";
            Reader reader = Resources.getResourceAsReader(resource);
            SqlSessionFactory sqlSessionFactory =
                    new SqlSessionFactoryBuilder().build(reader);
            SqlSession session = sqlSessionFactory.openSession();
            movieReaderMapper = session.getMapper(MovieReaderMapper.class);
            ratingReaderMapper = session.getMapper(RatingReaderMapper.class);
            directorMapper = session.getMapper(IDirectorMapper.class);
    }

    //Movies
    public List<Movie> getAllMovies(){
        return movieReaderMapper.getAll();
    }

    //Ratings
    public List<Rating> getAllRatings(){
        return ratingReaderMapper.getAll();
    }

    //Directors

    public List<Director> getAllDirectors(){
        return directorMapper.getAll();
    }

}
