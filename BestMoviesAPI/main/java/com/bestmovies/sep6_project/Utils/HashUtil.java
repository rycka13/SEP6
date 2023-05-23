package com.bestmovies.sep6_project.Utils;

import com.bestmovies.sep6_project.model.Hash.HashPair;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.SecureRandom;
import java.security.spec.KeySpec;

@Component
public class HashUtil {
    private SecureRandom random;

    public HashUtil(){
        random = new SecureRandom();
    }

    public HashPair hash(String hashString, byte[] salt) {
        try {
            hashString += "ThisisRandomPePpER";
            if(salt == null){
                salt = getSalt();
            }
            KeySpec spec = new PBEKeySpec(hashString.toCharArray(), salt, 65536, 128);
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
            byte[] hash = factory.generateSecret(spec).getEncoded();
            return new HashPair(hash, salt);
        }
        catch (Exception e){
            e.printStackTrace();
        }
       return null;
    }

    private byte[] getSalt(){
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }
}
