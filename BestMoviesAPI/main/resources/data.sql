insert into movies (title, `year`) values ('Test1', 2023);
insert into movies (title, `year`) values ('Test2', 2023);
insert into movies (title, `year`) values ('Test3', 2021);
insert into movies (title, `year`) values ('Test4', 2023);
insert into movies (title, `year`) values ('Test5', 2019);

insert into ratings (movie_id, rating, votes) values (1, 10, 100);
insert into ratings (movie_id, rating, votes) values (2, 10, 90);
insert into ratings (movie_id, rating, votes) values (3, 8, 100);
insert into ratings (movie_id, rating, votes) values (4, 7, 70);


insert into people (name, birth) values ('Person1', 2023);
insert into people (name, birth) values ('Person2', 2022);
insert into people (name, birth) values ('Person3', 2023);
insert into people (name, birth) values ('Person3', 2020);
insert into people (name, birth) values ('Person5', 2019);
insert into people (name, birth) values ('Person6', 2018);
insert into people (name, birth) values ('Person7', 2023);
insert into people (name, birth) values ('Person8', 2018);
insert into people (name, birth) values ('Person8', 2017);
insert into people (name, birth) values ('Person10', 2016);

insert into directors(movie_id, person_id) values (1, 1);
insert into directors(movie_id, person_id) values (2, 1);
insert into directors(movie_id, person_id) values (3, 2);
insert into directors(movie_id, person_id) values (4, 3);
insert into directors(movie_id, person_id) values (5, 4);
insert into directors(movie_id, person_id) values (5, 5);

insert into stars(movie_id, person_id) values (1, 6);
insert into stars(movie_id, person_id) values (2, 6);
insert into stars(movie_id, person_id) values (3, 7);
insert into stars(movie_id, person_id) values (4, 8);
insert into stars(movie_id, person_id) values (5, 9);
insert into stars(movie_id, person_id) values (5, 10);