INSERT INTO planes (model, seats_economy, seats_business, seats_first) VALUES
('Airbus A320', 150, 24, 8),
('Airbus A350', 260, 40, 12),
('Airbus A380', 420, 62, 20),
('Boeing 737', 160, 18, 6),
('Boeing 747', 380, 50, 14),
('Boeing 777', 300, 42, 16),
('Boeing 787 Dreamliner', 240, 28, 10),
('Embraer E190', 96, 8, 0),
('ATR 72', 68, 0, 0)
ON CONFLICT DO NOTHING;
