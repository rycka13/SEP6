package com.bestmovies.sep6_project.Utils;

import org.springframework.stereotype.Component;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;

@Component
public class HashUtil {
    private SecureRandom random;

    public HashUtil(){
        random = new SecureRandom();
    }

    public String hash(String hashString) throws NoSuchAlgorithmException, InvalidKeySpecException {
        KeySpec spec = new PBEKeySpec(hashString.toCharArray(), getSalt(), 65536, 128);
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        byte[] hash = factory.generateSecret(spec).getEncoded();
        return new String (hash, StandardCharsets.UTF_8);
    }

    private byte[] getSalt(){
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }
}
