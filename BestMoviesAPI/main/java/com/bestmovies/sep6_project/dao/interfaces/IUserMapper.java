package com.bestmovies.sep6_project.dao.interfaces;

import com.bestmovies.sep6_project.model.User.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IUserMapper {

    public User getUserByUsername(User user);
    public User getUserById(User user);
    public User getUserByEmail(User user);
    public User registerUser(User user);

}
