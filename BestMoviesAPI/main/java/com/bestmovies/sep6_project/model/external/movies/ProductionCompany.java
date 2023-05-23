package com.bestmovies.sep6_project.model.external.movies;

public class ProductionCompany {
    private float id;
    private String logo_path = null;
    private String name;
    private String origin_country;


    // Getter Methods

    public float getId() {
        return id;
    }

    public String getLogo_path() {
        return logo_path;
    }

    public String getName() {
        return name;
    }

    public String getOrigin_country() {
        return origin_country;
    }

    // Setter Methods

    public void setId(float id) {
        this.id = id;
    }

    public void setLogo_path(String logo_path) {
        this.logo_path = logo_path;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setOrigin_country(String origin_country) {
        this.origin_country = origin_country;
    }
}
