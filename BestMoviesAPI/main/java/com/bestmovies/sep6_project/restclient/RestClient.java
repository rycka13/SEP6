package com.bestmovies.sep6_project.restclient;


import com.bestmovies.sep6_project.model.MovieResult;
import com.bestmovies.sep6_project.model.PersonResult;
import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.FileNotFoundException;
import java.io.FileReader;

@Component
public class RestClient {
    private Gson gson;
    private RestTemplate template;
    private final String fileName = "api_key.json";
    private Key apiKey;
    private HttpHeaders headers;
    HttpEntity<String> httpEntity;

    public RestClient(){
        gson = new Gson();
        template = restTemplate();
        try {
            JsonReader reader = new JsonReader(new FileReader(fileName));
            apiKey = gson.fromJson(reader, Key.class);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        //Used only for getAllPersonsByName because it refuses API key (problem in tmdb)
        headers = new HttpHeaders();
        headers.add("Authorization","Bearer " + apiKey.getApi_bearer());
        headers.add("Content-Type","application/json");

        httpEntity = new HttpEntity<>(headers);
    }

    private RestTemplate restTemplate(){
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(3000);
        factory.setReadTimeout(3000);
        return new RestTemplate(factory);
    }

    public MovieResult getAllMoviesByName(String movieName){
        String uri = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey.getApi_key() + "&&query=\"" + movieName + "\"";
        String result = template.getForObject(uri, String.class);
        if(result != null){
            return gson.fromJson(result, MovieResult.class);
        }
        return null;
    }

    public PersonResult getAllPersonsByName(String personName){
        String uri = "https://api.themoviedb.org/3/search/person?query=" + "\"" + personName + "\"" + "&include_adult=false&language=en-US&page=1";
        ResponseEntity<String> result = template.exchange(uri, HttpMethod.GET, httpEntity, String.class);
        if(result.getStatusCode() == HttpStatus.OK){
            return gson.fromJson(result.getBody(), PersonResult.class);
        }
        return null;
    }
}
