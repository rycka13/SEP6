package com.bestmovies.sep6_project.model.external;

import java.util.ArrayList;

public class PersonResult {
    private float page;
    ArrayList < ExternalPerson > results = new ArrayList<>();
    private float total_pages;
    private float total_results;

// Getter Methods

    public float getPage() {
        return page;
    }

    public ArrayList<ExternalPerson> getResults() {
        return results;
    }

    public float getTotal_pages() {
        return total_pages;
    }

    public float getTotal_results() {
        return total_results;
    }

    // Setter Methods

    public void setPage(float page) {
        this.page = page;
    }

    public void setResults(ArrayList<ExternalPerson> results) {
        this.results = results;
    }

    public void setTotal_pages(float total_pages) {
        this.total_pages = total_pages;
    }

    public void setTotal_results(float total_results) {
        this.total_results = total_results;
    }
}
