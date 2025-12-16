DO $$
DECLARE
   dep RECORD;
   arr RECORD;
   plane_id INT;
   d DATE := now()::date;
   days INT := 0;
   counter INT := 0;
   price_base FLOAT;
BEGIN
   FOR dep IN SELECT * FROM airports LOOP
       FOR arr IN SELECT * FROM airports a WHERE a.code <> dep.code LOOP

       days := 0;
       WHILE days < 365 LOOP
           SELECT id INTO plane_id FROM planes ORDER BY random() LIMIT 1;

           price_base := (200 + random()*800);

           INSERT INTO flights (flight_number, departure_airport_id, arrival_airport_id,
                                plane_id, departure_time, arrival_time,
                                price_economy, price_business, price_first)
           VALUES (
                 'FL' || lpad(nextval('flight_number_seq')::text, 6, '0'),
                 dep.id,
                 arr.id,
                 plane_id,
                 (d + days) + make_interval(hours => floor(random()*12)::int),
                 (d + days) + make_interval(hours => floor(random()*12)::int + 1),
                 price_base,
                 price_base*1.8,
                 price_base*3.2
                 );

                 days := days + 1;
           END LOOP;

       END LOOP;
   END LOOP;
END $$;