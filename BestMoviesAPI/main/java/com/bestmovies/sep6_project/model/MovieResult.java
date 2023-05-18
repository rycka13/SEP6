package com.bestmovies.sep6_project.model;

import java.util.ArrayList;

public class MovieResult {
    private float page;
    ArrayList<ExternalMovie> results = new ArrayList <>();
    private float total_pages;
    private float total_results;


    // Getter Methods

    public float getPage() {
        return page;
    }

    public float getTotal_pages() {
        return total_pages;
    }

    public float getTotal_results() {
        return total_results;
    }

    public ArrayList<ExternalMovie> getResults() {
        return results;
    }

    // Setter Methods

    public void setPage(float page) {
        this.page = page;
    }

    public void setTotal_pages(float total_pages) {
        this.total_pages = total_pages;
    }

    public void setTotal_results(float total_results) {
        this.total_results = total_results;
    }

    public void setResults(ArrayList<ExternalMovie> results) {
        this.results = results;
    }
}
