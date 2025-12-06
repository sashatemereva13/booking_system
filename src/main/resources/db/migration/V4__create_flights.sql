CREATE TABLE IF NOT EXISTS flights (
id SERIAL PRIMARY KEY,
flight_number VARCHAR(50) UNIQUE NOT NULL,

departure_airport_id INT NOT NULL,
arrival_airport_id INT NOT NULL,
plane_id INT NOT NULL,

departure_time TIMESTAMP,
arrival_time TIMESTAMP,

price_economy DOUBLE PRECISION,
price_business DOUBLE PRECISION,
price_first DOUBLE PRECISION,

CONSTRAINT fk_flight_departure FOREIGN KEY (departure_airport_id) REFERENCES airports(id),
CONSTRAINT fk_flight_arrival FOREIGN KEY (arrival_airport_id) REFERENCES airports(id),
CONSTRAINT fk_flight_plane FOREIGN KEY (plane_id) REFERENCES planes(id)

);