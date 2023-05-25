-- -- Use the mySqlProject_db database
-- USE mySqlProject_db;

-- -- Insert records into department table
-- INSERT INTO department (name) 
-- VALUES 
--   ('Sales'),
--   ('Engineering'),
--   ('Finance'),
--   ('Marketing');

-- -- Insert records into role table
-- INSERT INTO role (title, salary, department_id) 
-- VALUES 
--   ('Sales Manager', 70000, (SELECT id FROM department WHERE name = 'Sales')),
--   ('Engineer', 60000, (SELECT id FROM department WHERE name = 'Engineering')),
--   ('Accountant', 50000, (SELECT id FROM department WHERE name = 'Finance')),
--   ('Marketing Manager', 65000, (SELECT id FROM department WHERE name = 'Marketing'));

-- -- Select the id of John Doe (assume that John Doe is the manager)
-- SET @manager_id = (SELECT id FROM employee WHERE last_name = 'Doe' LIMIT 1);

-- -- Insert records into employee table
-- INSERT INTO employee (first_name, last_name, role_id, manager_id) 
-- VALUES 
--   ('Jane', 'Doe', (SELECT id FROM role WHERE title = 'Engineer'), @manager_id),
--   ('Joe', 'Bloggs', (SELECT id FROM role WHERE title = 'Accountant'), @manager_id),
--   ('Jill', 'Bloggs', (SELECT id FROM role WHERE title = 'Marketing Manager'), @manager_id);


-- Use the mySqlProject_db database
USE mySqlProject_db;

-- Insert records into department table
INSERT INTO department (name) 
VALUES 
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Marketing');

-- Insert records into role table
INSERT INTO role (title, salary, department_id) 
VALUES 
  ('Sales Manager', 70000, (SELECT id FROM department WHERE name = 'Sales')),
  ('Engineer', 60000, (SELECT id FROM department WHERE name = 'Engineering')),
  ('Accountant', 50000, (SELECT id FROM department WHERE name = 'Finance')),
  ('Marketing Manager', 65000, (SELECT id FROM department WHERE name = 'Marketing'));

-- Select the id of the manager (assume that John Doe is the manager)
SET @manager_id = (SELECT id FROM employee WHERE last_name = 'Doe' LIMIT 1);

-- Insert records into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
  ('Jane', 'Doe', (SELECT id FROM role WHERE title = 'Engineer'), @manager_id),
  ('Joe', 'Bloggs', (SELECT id FROM role WHERE title = 'Accountant'), @manager_id),
  ('Jill', 'Bloggs', (SELECT id FROM role WHERE title = 'Marketing Manager'), @manager_id);
