package com.bestmovies.sep6_project.dao;

import com.bestmovies.sep6_project.dao.interfaces.IDirectorMapper;
import com.bestmovies.sep6_project.dao.interfaces.IMovieReaderMapper;
import com.bestmovies.sep6_project.dao.interfaces.IStarReaderMapper;
import com.bestmovies.sep6_project.dao.interfaces.IRatingReaderMapper;
import com.bestmovies.sep6_project.model.Director;
import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.model.Person;
import com.bestmovies.sep6_project.model.Rating;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.Reader;
import java.util.List;

public class MovieDao {

    private IMovieReaderMapper movieReaderMapper;
    private IRatingReaderMapper ratingReaderMapper;
    private IDirectorMapper directorMapper;
    private IStarReaderMapper starsReaderMapper;

    public MovieDao() throws IOException {
        String resource = "Mapper.xml";
            Reader reader = Resources.getResourceAsReader(resource);
            SqlSessionFactory sqlSessionFactory =
                    new SqlSessionFactoryBuilder().build(reader);
            SqlSession session = sqlSessionFactory.openSession();
            movieReaderMapper = session.getMapper(IMovieReaderMapper.class);
            ratingReaderMapper = session.getMapper(IRatingReaderMapper.class);
            directorMapper = session.getMapper(IDirectorMapper.class);
            starsReaderMapper = session.getMapper(IStarReaderMapper.class);
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
    public List<Person> getAllStars(){
        return starsReaderMapper.getAll();
    }
}
