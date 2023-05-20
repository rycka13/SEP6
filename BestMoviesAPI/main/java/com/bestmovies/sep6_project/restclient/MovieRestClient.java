package com.bestmovies.sep6_project.restclient;


import com.bestmovies.sep6_project.model.MovieResult;
import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.FileNotFoundException;
import java.io.FileReader;

@Component
public class MovieRestClient {
    private Gson gson;
    private RestTemplate template;
    private final String fileName = "api_key.json";
    private String apiKey;

    public MovieRestClient(){
        gson = new Gson();
        template = restTemplate();
        try {
            JsonReader reader = new JsonReader(new FileReader(fileName));
            apiKey = gson.fromJson(reader, String.class);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    private RestTemplate restTemplate(){
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(3000);
        factory.setReadTimeout(3000);
        return new RestTemplate(factory);
    }

    public MovieResult getAllByName(String movieName){
        String uri = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&&query=\"" + movieName + "\"";
        String result = template.getForObject(uri, String.class);
        if(result != null){
            return gson.fromJson(result, MovieResult.class);
        }
        return null;
    }
}
