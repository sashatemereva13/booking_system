CREATE TABLE employees (
                           id SERIAL PRIMARY KEY,
                           firstname VARCHAR(100) NOT NULL,
                           lastname VARCHAR(100) NOT NULL,
                           email VARCHAR(150) NOT NULL UNIQUE,
                           role VARCHAR(50) NOT NULL
);
