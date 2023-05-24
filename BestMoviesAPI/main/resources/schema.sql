drop table if exists movies;
drop table if exists ratings;
drop table if exists people;
drop table if exists directors;
drop table if exists stars;

CREATE TABLE movies (
                        id INTEGER AUTO_INCREMENT NOT NULL,
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
CREATE TABLE users (
                       id INTEGER AUTO_INCREMENT,
                       username TEXT NOT NULL,
                       password VARBINARY(32) NOT NULL,
                       salt VARBINARY(32),
                       f_name TEXT,
                       l_name TEXT,
                       email TEXT,
                       PRIMARY KEY(id)
);

CREATE TABLE favorites
(
    user_id  INTEGER NOT NULL,
    movie_id INTEGER NOT NULL,
    rating   INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, movie_id)
);
