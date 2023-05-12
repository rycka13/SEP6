package com.bestmovies.sep6_project.dao;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.InputStream;

public class MovieReaderDao {
    public MovieReaderDao(){
        String resource = "MovieReaderMapper_RENAMELATER.xml";

        try{
            InputStream inputStream = Resources.getResourceAsStream(resource);
            SqlSessionFactory sqlSessionFactory =
                    new SqlSessionFactoryBuilder().build(inputStream);

            SqlSession session = sqlSessionFactory.openSession();

//            Blog blog = session.selectOne(
//                    "org.mybatis.example.BlogMapper.selectBlog", 101);
        }
        catch(Exception exception){
            System.out.println(exception.getStackTrace().toString());
        }
    }
}
