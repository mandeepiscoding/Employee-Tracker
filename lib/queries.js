const selectEmployeesQuery = `
SELECT
  e.id As Id,
  e.first_name AS First,
  e.last_name AS Last,
  r.salary As Salary,
  r.title AS Role,
  d.name AS Dept,
  CONCAT(m.first_name, ' ', m.last_name) AS Manager
FROM
  employee e
JOIN
  role r ON e.role_id = r.id
LEFT JOIN
  employee m ON e.manager_id = m.id
JOIN
  department d ON r.department_id = d.id
ORDER BY e.id`;

const selectEmployeesByMgrQuery = `
SELECT
  e.id As Id,
  e.first_name AS First,
  e.last_name AS Last,
  r.salary As Salary,
  r.title AS Role,
  d.name AS Dept
FROM
  employee e
JOIN
  role r ON e.role_id = r.id
LEFT JOIN
  employee m ON e.manager_id = m.id
JOIN
  department d ON r.department_id = d.id
WHERE CONCAT(m.first_name, ' ', m.last_name) = ?
ORDER BY e.id`;

const selectManagersQuery = `
SELECT DISTINCT CONCAT(m.first_name, ' ', m.last_name) As manager_name
FROM employee e
LEFT JOIN
  employee m ON e.manager_id = m.id
WHERE e.manager_id IS NOT NULL
ORDER BY manager_name`;

const selectEmployeesByDeptQuery = `
SELECT
  e.id As Id,
  e.first_name AS First,
  e.last_name AS Last,
  r.salary As Salary,
  r.title AS Role,
  CONCAT(m.first_name, ' ', m.last_name) As Manager
FROM
  employee e
JOIN
  role r ON e.role_id = r.id
LEFT JOIN
  employee m ON e.manager_id = m.id
JOIN
  department d ON r.department_id = d.id
WHERE d.name = ?
ORDER BY e.id`;

const selectRolesQuery = `
SELECT
  r.id as Id,
  r.title As Title,
  r.salary As Salary,
  d.name As Dept
FROM
  role r
JOIN
  department d ON r.department_id = d.id
  ORDER BY r.id`;

const selectDeptQuery = `
SELECT
  id As Id,
  name As Name
FROM
  department`;

const selectIdByEmpNameQuery = `
SELECT id
FROM employee
WHERE CONCAT(first_name, ' ', last_name) = ?;`;

const selectIdByRoleQuery = `
SELECT id
FROM role
WHERE title = ?;`;

const selectIdByDeptQuery = `
SELECT id
FROM department
WHERE name = ?;`;

const addNewEmployeeQuery = `
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?);`;

const addNewRoleQuery = `
INSERT INTO role (title, salary, department_id)
VALUES (?, ?, ?);`;

const addNewDepartmentQuery = `
INSERT INTO department (name)
VALUES (?);`;

const updateRoleQuery = `
UPDATE employee
SET role_id = ?
WHERE CONCAT(first_name, ' ', last_name) = ?;`;

const updateManagerQuery = `
UPDATE employee
SET manager_id = ?
WHERE CONCAT(first_name, ' ', last_name) = ?;`;

const deleteEmployeeQuery = `
DELETE FROM employee
WHERE CONCAT(first_name, ' ', last_name) = ?;`;

const deleteRoleQuery = `
DELETE FROM role
WHERE title = ?;`;

const deleteDepartmentQuery = `
DELETE FROM department
WHERE name = ?;`;

module.exports = {
  selectEmployeesQuery,
  selectEmployeesByMgrQuery,
  selectManagersQuery,
  selectEmployeesByDeptQuery,
  selectRolesQuery,
  selectDeptQuery,
  selectIdByEmpNameQuery,
  selectIdByRoleQuery,
  selectIdByDeptQuery,
  addNewEmployeeQuery,
  addNewRoleQuery,
  addNewDepartmentQuery,
  updateRoleQuery,
  updateManagerQuery,
  deleteEmployeeQuery,
  deleteRoleQuery,
  deleteDepartmentQuery,
};