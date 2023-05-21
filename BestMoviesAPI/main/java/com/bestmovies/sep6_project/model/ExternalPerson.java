package com.bestmovies.sep6_project.model;

import java.util.ArrayList;

public class ExternalPerson {
    private boolean adult;
    private float gender;
    private float id;
    private String known_for_department;
    private String name;
    private String original_name;
    private float popularity;
    private String profile_path;
    ArrayList< ExternalMovie > known_for = new ArrayList <> ();


    // Getter Methods

    public boolean getAdult() {
        return adult;
    }

    public float getGender() {
        return gender;
    }

    public float getId() {
        return id;
    }

    public String getKnown_for_department() {
        return known_for_department;
    }

    public String getName() {
        return name;
    }

    public String getOriginal_name() {
        return original_name;
    }

    public float getPopularity() {
        return popularity;
    }

    public String getProfile_path() {
        return profile_path;
    }

    // Setter Methods

    public void setAdult(boolean adult) {
        this.adult = adult;
    }

    public void setGender(float gender) {
        this.gender = gender;
    }

    public void setId(float id) {
        this.id = id;
    }

    public void setKnown_for_department(String known_for_department) {
        this.known_for_department = known_for_department;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setOriginal_name(String original_name) {
        this.original_name = original_name;
    }

    public void setPopularity(float popularity) {
        this.popularity = popularity;
    }

    public void setProfile_path(String profile_path) {
        this.profile_path = profile_path;
    }
}
