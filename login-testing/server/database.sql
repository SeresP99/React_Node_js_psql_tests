CREATE DATABASE test_login;

CREATE TABLE test_users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(45) NOT NULL,
    email  VARCHAR(65) NOT NULL,
    password VARCHAR(255) NOT NULL
);
