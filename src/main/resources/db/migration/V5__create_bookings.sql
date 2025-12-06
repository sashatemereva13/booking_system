CREATE TABLE IF NOT EXISTS bookings (
id SERIAL PRIMARY KEY,

passenger_name VARCHAR(255) NOT NULL,
passenger_email VARCHAR(255) NOT NULL,

flight_id INT NOT NULL,
seat_id INT NOT NULL,

booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

price_paid NUMERIC(10,2) DEFAULT 0,

CONSTRAINT fk_booking_flight FOREIGN KEY (flight_id) REFERENCES flights(id),
CONSTRAINT fk_booking_seat FOREIGN KEY (seat_id) REFERENCES seats(id)

);