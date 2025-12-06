CREATE TABLE IF NOT EXISTS planes (
id SERIAL PRIMARY KEY,
model VARCHAR(255) NOT NULL,
seats_economy INT NOT NULL,
seats_business INT NOT NULL,
seats_first INT NOT NULL
);