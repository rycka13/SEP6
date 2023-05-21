drop table if exists movies;
drop table if exists ratings;
drop table if exists people;
drop table if exists directors;
drop table if exists stars;

CREATE TABLE movies (
                        id INTEGER AUTO_INCREMENT,
                        title TEXT NOT NULL,
                        `year` NUMERIC,
                        PRIMARY KEY(id)
);
CREATE TABLE ratings (
                         movie_id INTEGER NOT NULL,
                         rating REAL NOT NULL,
                         votes INTEGER NOT NULL,
                         FOREIGN KEY(movie_id) REFERENCES movies(id)
);
CREATE TABLE people (
                        id INTEGER AUTO_INCREMENT,
                        name TEXT NOT NULL,
                        birth NUMERIC,
                        PRIMARY KEY(id)
);

CREATE TABLE directors (
                           movie_id INTEGER NOT NULL,
                           person_id INTEGER NOT NULL,
                           FOREIGN KEY(movie_id) REFERENCES movies(id) ON DELETE CASCADE,
                           FOREIGN KEY(person_id) REFERENCES people(id) ON DELETE CASCADE
);

CREATE TABLE stars (
                       movie_id INTEGER NOT NULL,
                       person_id INTEGER NOT NULL,
                       FOREIGN KEY(movie_id) REFERENCES movies(id) ON DELETE CASCADE,
                       FOREIGN KEY(person_id) REFERENCES people(id) ON DELETE CASCADE
);
