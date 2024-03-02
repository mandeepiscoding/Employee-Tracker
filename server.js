const connection = require('./lib/connection.js');
const {
    mainMenuQuestions,
    addRoleQuestions,
    addDepartmentQuestions,
    addEmployeeQuestions,
    updateEmpRoleQuestions,
    updateEmpMgrQuestions,
    viewByManagerQuestions,
    viewByDepartmentQuestions,
    deleteEmployeeQuestions,
    deleteRoleQuestions,
    deleteDepartmentQuestions,
} = require('./lib/input.js');
const intro = require('./lib/intro.js');
const {
    selectEmployeesQuery,
    selectRolesQuery,
    selectDeptQuery,
    selectManagersQuery,
    deleteEmployeeQuery,
    deleteRoleQuery,
    deleteDepartmentQuery,
} = require('./lib/queries.js');
const {
    updateRoleArray,
    updateEmployeeArray,
    updateDeptArray,
    updateManagerArray,
} = require('./lib/refresh.js');
const { prompt } = require('inquirer');
const { makeTable } = require('./lib/tables.js');
const { getEmployeeId, getRoleId, getDeptId } = require('./lib/search.js');
const { addEmployee, addRole, addDepartment } = require('./lib/add.js');
const { updateEmpRole, updateEmpManager } = require('./lib/update.js');
const { makeManagerTable } = require('./lib/manager.js');
const { makeDepartmentTable } = require('./lib/department.js');

let conn;

async function start() {
    console.log(intro);
    conn = await connection;
    mainMenu();
}

async function mainMenu() {
    const userChoice = await prompt(mainMenuQuestions);
    let quit = false;
    let deptData;
    let empData;
    let roleData;
    let managerId;
    let roleId;
    let employees;
    let managers;
    let departments;

    switch (userChoice.topMenu) {
        case 'View All Employees':
            employees = await conn.query(selectEmployeesQuery);
            console.log('');
            makeTable(employees[0]);
            break;

        case 'View Employees By Manager':
            const updatedViewByManagerQuestions = await updateManagerArray(
                conn,
                viewByManagerQuestions,
                0
            );
            empData = await prompt(updatedViewByManagerQuestions);
            await makeManagerTable(conn, empData.name);
            break;

        case 'View Employees By All Managers':
            managers = await conn.query(selectManagersQuery);
            for (let i = 0; i < managers[0].length; i++) {
                await makeManagerTable(conn, managers[0][i].manager_name);
            }
            break;

        case 'View Employees By Department':
            const updatedViewByDepartmentQuestions = await updateDeptArray(
                conn,
                viewByDepartmentQuestions,
                0
            );
            empData = await prompt(updatedViewByDepartmentQuestions);
            await makeDepartmentTable(conn, empData.name);
            break;

        case 'View Employees By All Departments':
            departments = await conn.query(selectDeptQuery);
            for (let i = 0; i < departments[0].length; i++) {
                await makeDepartmentTable(conn, departments[0][i].Name);
            }
            break;

        case 'Add Employee':
            let updatedAddEmpQuestions = await updateRoleArray(
                conn,
                addEmployeeQuestions,
                2
            );
            updatedAddEmpQuestions = await updateEmployeeArray(
                conn,
                updatedAddEmpQuestions,
                3,
                true
            );
            empData = await prompt(updatedAddEmpQuestions);
            roleId = await getRoleId(conn, empData.role);
            if (empData.manager === 'None') {
                managerId = 0;
            } else {
                managerId = await getEmployeeId(conn, empData.manager);
            }
            await addEmployee(
                conn,
                empData.first_name,
                empData.last_name,
                roleId,
                managerId
            );
            break;

        case 'Update Employee Role':
            let updatedUpRoleQuestions = await updateEmployeeArray(
                conn,
                updateEmpRoleQuestions,
                0,
                false
            );
            updatedUpRoleQuestions = await updateRoleArray(
                conn,
                updatedUpRoleQuestions,
                1
            );
            empData = await prompt(updateEmpRoleQuestions);
            roleId = await getRoleId(conn, empData.role);
            await updateEmpRole(conn, roleId, empData.name, empData.role);
            break;

        case 'Update Employee Manager':
            let updatedUpMgrQuestions = await updateEmployeeArray(
                conn,
                updateEmpMgrQuestions,
                0,
                false
            );
            updatedUpMgrQuestions = await updateEmployeeArray(
                conn,
                updatedUpMgrQuestions,
                1,
                true
            );
            empData = await prompt(updatedUpMgrQuestions);
            if (empData.manager === 'None') {
                managerId = 0;
            } else {
                managerId = await getEmployeeId(conn, empData.manager);
            }
            await updateEmpManager(conn, managerId, empData.name, empData.manager);
            break;

        case 'Remove Employee':
            const updatedDeleteEmployeeQuestions = await updateEmployeeArray(
                conn,
                deleteEmployeeQuestions,
                0,
                false
            );
            empData = await prompt(updatedDeleteEmployeeQuestions);
            await conn.query(deleteEmployeeQuery, empData.name);
            console.log(`
      ${empData.name} has been removed!
`);
            break;

        case 'View All Roles':
            const roles = await conn.query(selectRolesQuery);
            console.log('');
            makeTable(roles[0]);
            break;

        case 'Add Role':
            const updatedAddRoleQuestions = await updateDeptArray(
                conn,
                addRoleQuestions,
                2
            );
            roleData = await prompt(updatedAddRoleQuestions);
            const departmentId = await getDeptId(conn, roleData.department);
            await addRole(conn, roleData.title, roleData.salary, departmentId);
            break;

        case 'Remove Role':
            const updatedDeleteRoleQuestions = await updateRoleArray(
                conn,
                deleteRoleQuestions,
                0
            );
            roleData = await prompt(updatedDeleteRoleQuestions);
            await conn.query(deleteRoleQuery, roleData.name);
            console.log(`
      ${roleData.name} has been removed!
`);
            break;

        case 'View All Departments':
            departments = await conn.query(selectDeptQuery);
            console.log('');
            makeTable(departments[0]);
            break;

        case 'Add Department':
            deptData = await prompt(addDepartmentQuestions);
            await addDepartment(conn, deptData.name);
            break;

        case 'Remove Department':
            const updatedDeleteDepartmentQuestions = await updateDeptArray(
                conn,
                deleteDepartmentQuestions,
                0
            );
            deptData = await prompt(updatedDeleteDepartmentQuestions);
            await conn.query(deleteDepartmentQuery, deptData.name);
            console.log(`
      ${deptData.name} has been removed!
`);
            break;

        default:
            quit = true;
            break;
    }

    if (quit) {
        process.exit();
    } else {
        mainMenu();
    }
}

start();