INSERT INTO seats (seat_number, seats, plane_id)
SELECT 'A' || generate_series(1, 50), 'FIRST', id FROM planes
UNION ALL
SELECT 'B' || generate_series(1, 50), 'BUSINESS', id FROM planes
UNION ALL
SELECT 'C' || generate_series(1, 50),'ECONOMY', id FROM planes
UNION ALL
SELECT 'D' || generate_series(1, 50), 'ECONOMY', id FROM planes;