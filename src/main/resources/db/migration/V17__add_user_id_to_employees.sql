ALTER TABLE employees
    ADD COLUMN user_id BIGINT;

UPDATE employees e
SET user_id = u.id
    FROM users u
WHERE u.email = e.email
  AND e.user_id IS NULL;

UPDATE employees
SET user_id = (
    SELECT id FROM users
    WHERE email = 'irina.kiseleva@epita.fr'
)
WHERE user_id IS NULL;

ALTER TABLE employees
    ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE employees
    ADD CONSTRAINT fk_employees_user
        FOREIGN KEY (user_id) REFERENCES users(id);
