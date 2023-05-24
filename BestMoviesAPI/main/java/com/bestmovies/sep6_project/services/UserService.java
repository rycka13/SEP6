package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.Utils.HashUtil;
import com.bestmovies.sep6_project.dao.interfaces.IUserMapper;
import com.bestmovies.sep6_project.model.User.User;
import com.bestmovies.sep6_project.services.enums.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class UserService {

    @Autowired
    private HashUtil hashUtil;

    @Autowired
    private IUserMapper userMapper;

    public ResponseMessage loginUser(User user) {
        if(user != null){
            if(user.getUserName() != null){
                User dbUser = userMapper.getUserByUsername(user.getUserName());
                if(Arrays.equals(hashUtil.hash(user.getPassword(), dbUser.getHashedPassword().getSalt()).getHashedString(),
                        dbUser.getHashedPassword().getHashedString())){
                    return ResponseMessage.SUCCESS;
                }
                else{
                    return ResponseMessage.WRONG_PASSWORD;
                }
            }
            if(user.getEmail() != null){
                User dbUser = userMapper.getUserByEmail(user.getEmail());
                if(Arrays.equals(hashUtil.hash(user.getPassword(), dbUser.getHashedPassword().getSalt()).getHashedString(),
                        dbUser.getHashedPassword().getHashedString())){
                    return ResponseMessage.SUCCESS;
                }
                else{
                    return ResponseMessage.WRONG_PASSWORD;
                }
            }
        }
        return ResponseMessage.INTERNAL_ERROR;
    }

    public ResponseMessage registerUser(User user){
        if(user != null){
            if(userMapper.getUserByUsername(user.getUserName())!=null){
                return ResponseMessage.EXISTING_USERNAME;
            }
            if(userMapper.getUserByEmail(user.getEmail())!=null){
                return ResponseMessage.EXISTING_EMAIL;
            }
            if(!user.getPassword().matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")){
                return ResponseMessage.PASSWORD_ERROR;
            }
            user.setHashedPassword(hashUtil.hash(user.getPassword(),null));
            userMapper.registerUser(user);
            return ResponseMessage.SUCCESS;
        }
        return ResponseMessage.INTERNAL_ERROR;
    }
}
