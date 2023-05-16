package com.bestmovies.sep6_project.dao;

import com.bestmovies.sep6_project.dao.interfaces.IDirectorMapper;
import com.bestmovies.sep6_project.dao.interfaces.IMovieMapper;
import com.bestmovies.sep6_project.dao.interfaces.IRatingMapper;
import com.bestmovies.sep6_project.dao.interfaces.IStarMapper;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.Reader;

public class Dao {
    private static Dao single_instance = null;
    public SqlSession session;
    public IMovieMapper movieMapper;
    public IRatingMapper ratingMapper;
    public IDirectorMapper directorMapper;
    public IStarMapper starMapper;

    private Dao() throws IOException {
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
    public static synchronized Dao getInstance() throws IOException {
        if(single_instance == null) single_instance = new Dao();

        return single_instance;
    }
}
