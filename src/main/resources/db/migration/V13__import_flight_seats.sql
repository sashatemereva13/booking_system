DO $$
DECLARE
     f RECORD;
     i INT;
BEGIN
    FOR f IN SELECT id FROM flights LOOP

        -- Economy seats
        FOR i IN 1..30 LOOP
            INSERT INTO flight_seats(flight_id, seat_number, seat_class, occupied)
            VALUES (f.id, 'E' || i, 'ECONOMY', false);
        END LOOP;

        -- Business seats
        FOR i IN 1..10 LOOP
            INSERT INTO flight_seats(flight_id, seat_number, seat_class, occupied)
            VALUES (f.id, 'B' || i, 'BUSINESS', false);
        END LOOP;


        -- First class
        FOR i IN 1..5 LOOP
            INSERT INTO flight_seats(flight_id, seat_number, seat_class, occupied)
            VALUES (f.id, 'F' || i, 'FIRST', false);
        END LOOP;

    END LOOP;
END $$;