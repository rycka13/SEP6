package com.bestmovies.sep6_project.dao;

import com.bestmovies.sep6_project.dao.interfaces.IDirectorMapper;
import com.bestmovies.sep6_project.dao.interfaces.IMovieMapper;
import com.bestmovies.sep6_project.dao.interfaces.IStarMapper;
import com.bestmovies.sep6_project.dao.interfaces.IRatingMapper;
import com.bestmovies.sep6_project.model.*;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.Reader;
import java.util.List;

public class MovieDao {

    private IMovieMapper movieMapper;
    private IRatingMapper ratingMapper;
    private IDirectorMapper directorMapper;
    private IStarMapper starsMapper;
    private SqlSession session;

    public MovieDao() throws IOException {
        String resource = "Mapper.xml";
            Reader reader = Resources.getResourceAsReader(resource);
            SqlSessionFactory sqlSessionFactory =
                    new SqlSessionFactoryBuilder().build(reader);
            session = sqlSessionFactory.openSession();
            movieMapper = session.getMapper(IMovieMapper.class);
            ratingMapper = session.getMapper(IRatingMapper.class);
            directorMapper = session.getMapper(IDirectorMapper.class);
            starsMapper = session.getMapper(IStarMapper.class);
    }

    //Movies
    public List<Movie> getAllMovies(){
        return movieMapper.getAll();
    }

    //Ratings
    public List<Rating> getAllRatings(){
        return ratingMapper.getAll();
    }

    //Directors

    public List<Director> getAllDirectors(){
        return directorMapper.getAll();
    }
    public List<Star> getAllStars(){
        return starsMapper.getAll();
    }
    public void createMovie(Movie movie){
        movieMapper.createMovie(movie);
        session.commit();
    }
    public void updateMovie(Movie movie){
        movieMapper.updateMovie(movie);
        session.commit();
    }
    public void deleteMovie(int id){
        movieMapper.deleteMovie(id);
        session.commit();
    }
}
