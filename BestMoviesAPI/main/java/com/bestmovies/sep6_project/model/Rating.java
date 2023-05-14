package com.bestmovies.sep6_project.model;

public class Rating {
    private Movie movie;
    private double rating;
    private int votes;

    public Rating(int movieID, double rating, int votes) {
        this.movie = movie;
        this.rating = rating;
        this.votes = votes;
    }

    public double getRating() {
        return rating;
    }

    public int getVotes() {
        return votes;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setVotes(int votes) {
        this.votes = votes;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }
}
