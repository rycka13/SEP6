package com.bestmovies.sep6_project.model.Hash;

public class HashPair {
    byte[] hashedString;
    byte[] salt;

    public HashPair(byte[] hashedString, byte[] salt) {
        this.hashedString = hashedString;
        this.salt = salt;
    }

    public byte[] getHashedString() {
        return hashedString;
    }

    public void setHashedString(byte[] hashedString) {
        this.hashedString = hashedString;
    }

    public byte[] getSalt() {
        return salt;
    }

    public void setSalt(byte[] salt) {
        this.salt = salt;
    }
}
