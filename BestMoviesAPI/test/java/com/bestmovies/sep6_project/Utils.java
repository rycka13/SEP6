package com.bestmovies.sep6_project;

import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.model.Person;
import com.bestmovies.sep6_project.model.Rating;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Utils {
    public static <T> List<Long> objectToId(List<T> objects) {
        return objects.stream()
                .flatMap(o -> {
                    if (o instanceof Movie) {
                        return Stream.of(((Movie) o).getId());
                    } else if (o instanceof Rating) {
                        return Stream.of(((Rating) o).getMovie().getId());
                    } else if (o instanceof Person) {
                        return Stream.of(((Person) o).getId());
                    }
                    return Stream.empty();
                })
                .collect(Collectors.toList());
    }

}
