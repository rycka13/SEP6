package com.bestmovies.sep6_project.model;

public class Ratings {
    private int movieID;
    private double rating;
    private int votes;

    public Ratings(int movieID, double rating, int votes) {
        this.movieID = movieID;
        this.rating = rating;
        this.votes = votes;
    }

    public double getRating() {
        return rating;
    }

    public int getVotes() {
        return votes;
    }

    public int getMovieID() {
        return movieID;
    }

    public void setVotes(int votes) {
        this.votes = votes;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public void setMovieID(int movieID) {
        this.movieID = movieID;
    }
}
