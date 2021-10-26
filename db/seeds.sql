
INSERT INTO department (id, name)
VALUES
  ('Accounting'),
  ('Human Capital'),
  ('Dev Ops'),
  ('Product'),
  ('Securities');

INSERT INTO role (title, salary, department_id)
VALUES
  ( 'VP' 100000 3),
  ( 'Associate' 70000 4),
  ( 'Analyst' 48000 1),
  ('Senior Analyst' 54000 2),
  ('Partner' 300000 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Yvonne', 'Carter', 3, 2),
  ( 'Josh', 'Lee', 4, NULL),
  ('David', 'Stark', 5, 1),
  ('Hunter', 'Watson', 2, NULL),
  ('Oscar', 'Romero', 1, NULL)