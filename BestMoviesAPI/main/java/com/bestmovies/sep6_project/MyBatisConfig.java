package com.bestmovies.sep6_project;

import com.bestmovies.sep6_project.dao.interfaces.IDirectorMapper;
import com.bestmovies.sep6_project.dao.interfaces.IMovieMapper;
import com.bestmovies.sep6_project.dao.interfaces.IRatingMapper;
import com.bestmovies.sep6_project.dao.interfaces.IStarMapper;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import javax.sql.DataSource;

@Configuration
public class MyBatisConfig {
  @Autowired
  DataSource dataSource;
  @Bean
  public SqlSessionFactory sqlSessionFactory() throws Exception {
    SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
    Resource myBatisConfig = new PathMatchingResourcePatternResolver().getResource("classpath:Mapper.xml");
    factoryBean.setDataSource(dataSource);
    factoryBean.setConfigLocation(myBatisConfig);
    return factoryBean.getObject();
  }
  @Bean
  public IDirectorMapper directorMapper() throws Exception {
    SqlSessionTemplate sqlSessionTemplate = new SqlSessionTemplate(sqlSessionFactory());
    return sqlSessionTemplate.getMapper(IDirectorMapper.class);
  }
  @Bean
  public IMovieMapper movieMapper() throws Exception {
    SqlSessionTemplate sqlSessionTemplate = new SqlSessionTemplate(sqlSessionFactory());
    return sqlSessionTemplate.getMapper(IMovieMapper.class);
  }
  @Bean
  public IRatingMapper ratingMapper() throws Exception {
    SqlSessionTemplate sqlSessionTemplate = new SqlSessionTemplate(sqlSessionFactory());
    return sqlSessionTemplate.getMapper(IRatingMapper.class);
  }
  @Bean
  public IStarMapper starMapper() throws Exception {
    SqlSessionTemplate sqlSessionTemplate = new SqlSessionTemplate(sqlSessionFactory());
    return sqlSessionTemplate.getMapper(IStarMapper.class);
  }
}