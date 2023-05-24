package com.bestmovies.sep6_project.dao.interfaces;

import com.bestmovies.sep6_project.model.User.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IUserMapper {

    User getUserByUsername(String userName);
    User getUserById(long id);
    User getUserByEmail(String email);
    void registerUser(User user);

}
