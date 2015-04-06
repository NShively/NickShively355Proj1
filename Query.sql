use nshively;

DROP TABLE IF EXISTS MovieGenre CASCADE;
DROP TABLE IF EXISTS TerribleGames CASCADE;
DROP TABLE IF EXISTS TerribleMusic CASCADE;
DROP TABLE IF EXISTS TerribleMovies CASCADE;
DROP TABLE IF EXISTS MUsers CASCADE;


CREATE TABLE MUsers(UserID INT PRIMARY KEY AUTO_INCREMENT, 
Username varchar(100));

CREATE TABLE TerribleMovies(Title varchar(100) PRIMARY KEY, 
Director varchar(100), 
Rating INT, 
UserPosted int, 
FOREIGN KEY (UserPosted) REFERENCES MUsers(UserID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE TerribleGames(Title varchar(100) PRIMARY KEY, 
Company varchar(100), 
Rating INT, 
UserPosted int, 
FOREIGN KEY (UserPosted) REFERENCES MUsers(UserID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE TerribleMusic(Title varchar(100) PRIMARY KEY, 
Composer varchar(100), 
Rating INT, 
UserPosted int, 
FOREIGN KEY (UserPosted) REFERENCES MUsers(UserID) ON DELETE CASCADE ON UPDATE CASCADE);


CREATE TABLE MovieGenre(
Title varchar(100) PRIMARY KEY, 
Genre varchar(100),
FOREIGN KEY(Title) REFERENCES TerribleMovies(Title) ON DELETE CASCADE ON UPDATE CASCADE);

INSERT INTO MUsers(Username) VALUES ("A1");
INSERT INTO MUsers(Username) VALUES ("A2");
INSERT INTO MUsers(Username) VALUES ("A3");
INSERT INTO MUsers(Username) VALUES ("A4");
INSERT INTO MUsers(Username) VALUES ("A5");
INSERT INTO MUsers(Username) VALUES ("A6");

INSERT INTO TerribleMovies VALUES("Plan 9 From Outer Space", "Ed Wood", 5, 1);
INSERT INTO TerribleMovies VALUES("The Room", "Tommy Wiseau", 5, 4);
INSERT INTO TerribleMovies VALUES("The Horrors of Spider Island", "no idea", 3, 2);
INSERT INTO TerribleMovies VALUES("Glen or Glenda?", "Ed Wood", 2, 3);
INSERT INTO TerribleMovies VALUES("The Evil Dead", "Raimi", 5, 3);

INSERT INTO TerribleGames VALUES("Sonic 06", "SEGA", 5, 1);
INSERT INTO TerribleGames VALUES("Sonic Boom", "SEGA", 5, 1);
INSERT INTO TerribleGames VALUES("Dead or Alive Beach Volleyball Xtreme 2", "Team Ninja", 2, 5);

INSERT INTO TerribleMusic VALUES("Anything by Insane Clown Posse", "Insane Clown Posse", 5, 4);
INSERT INTO TerribleMusic VALUES("Crawling through my skin", "no idea", 0, 1);
INSERT INTO TerribleMusic VALUES("b", "d", 5, 2);

INSERT INTO MovieGenre VALUES ("The Room", "Drama?");
INSERT INTO MovieGenre VALUES ("Plan 9 From Outer Space", "Sci-Fi");
INSERT INTO MovieGenre VALUES ("The Evil Dead", "Horror");


