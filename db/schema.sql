DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_dbB;

USE burgers_db;

CREATE TABLE burgers (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  burger_name VARCHAR(45) NULL,
  devoured BOOLEAN
);
SELECT * FROM burgers;