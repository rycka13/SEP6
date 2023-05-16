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
    private IStarMapper starMapper;
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
            starMapper = session.getMapper(IStarMapper.class);
    }

    //Movies
    public List<Movie> getAllMovies(){
        return movieMapper.getAll();
    }

    public Movie getMovieById(int id){
        return movieReaderMapper.getMovieById(id);
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
        return starMapper.getAll();
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
    public void createStar(Star star){
        starMapper.createStar(star);
        session.commit();
    }
    public void updateStar(Star star){
        starMapper.updateStar(star);
        session.commit();
    }
    public void deleteStar(int id){
        starMapper.deleteStar(id);
        session.commit();
    }
    public void createDirector(Director director){
        directorMapper.createDirector(director);
        session.commit();
    }
    public void updateDirector(Director director){
        directorMapper.updateDirector(director);
        session.commit();
    }
    public void deleteDirector(int id){
        directorMapper.deleteDirector(id);
        session.commit();
    }

    public Director getDirectorById(int id) {
        return new Director();
    }

    public Star getStarById(int id) {
        return new Star();
    }
}
