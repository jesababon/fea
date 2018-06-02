DROP DATABASE fe_app;

CREATE DATABASE fe_app;

\c fe_app

DROP TABLE IF EXISTS encounters;
DROP TABLE IF EXISTS population;

CREATE TABLE population (
    population_id SERIAL PRIMARY KEY,
    average_pop INTEGER,
    zip_code VARCHAR(10)
    );

CREATE TABLE encounters (
    encounter_id SERIAL PRIMARY KEY,
    subject_name VARCHAR(255),
    subject_age  VARCHAR(30),
    subject_gender VARCHAR(30),
    subject_race VARCHAR(30),
    image_deceased_url VARCHAR,
    injury_date DATE,
    injury_location VARCHAR(255),
    death_city VARCHAR(100),
    death_state VARCHAR(100),
    zip_code VARCHAR(10),
    death_county VARCHAR(30),
    death_address VARCHAR(255),
    latitude VARCHAR(255),
    longitude VARCHAR(255),
    agencies_involved VARCHAR,
    death_cause VARCHAR(255),
    event_description VARCHAR,
    official_disposition VARCHAR(255),
    news_url VARCHAR(1000),
    agency_aware_mental_illness VARCHAR(30)
    );