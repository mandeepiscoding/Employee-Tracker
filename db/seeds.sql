INSERT INTO
  department (name)
VALUES
  ('Engineering'),
  ('Legal'),
  ('Finance'),
  ('Sales');

INSERT INTO
  role (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 4),
  ('Salesperson', 80000, 4),
  ('Lead Engineer', 150000, 1),
  ('Software Engineer', 120000, 1),
  ('Account Manager', 160000, 3),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 250000, 2),
  ('Lawyer', 190000, 2);

INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, null),
  ('Mike', 'Chan', 2, 1),
  ('Ashley', 'Rodriguez', 3, null),
  ('', 'Singh', 4, 3),
  ('Kunal', 'Singh', 5, null),
  ('Malia', 'Brown', 6, 5),
  ('Sarah', 'Lourd', 7, null),
  ('Tom', 'Allen', 8, 7);