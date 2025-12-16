CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       first_name VARCHAR(100) NOT NULL,
                       last_name VARCHAR(100) NOT NULL,
                       address VARCHAR(255),
                       email VARCHAR(150) UNIQUE NOT NULL,
                       phone VARCHAR(50),
                       birthdate DATE,
                       password VARCHAR(255) NOT NULL
);
