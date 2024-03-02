const {
    addNewEmployeeQuery,
    addNewRoleQuery,
    addNewDepartmentQuery,
} = require('./queries.js');

async function addEmployee(conn, first_name, last_name, role_id, manager_id) {
    let res;
    if (manager_id === 0) {
        res = await conn.query(addNewEmployeeQuery, [
            first_name,
            last_name,
            role_id,
            null,
        ]);
    } else {
        res = await conn.query(addNewEmployeeQuery, [
            first_name,
            last_name,
            role_id,
            manager_id,
        ]);
    }
    console.log(`
        ${first_name} ${last_name} Added!
        `);
    return res;
}

async function addRole(conn, title, salary, department_id) {
    const res = await conn.query(addNewRoleQuery, [title, salary, department_id]);
    console.log(`
        ${title} Added!
        `);
    return res;
}

async function addDepartment(conn, name) {
    const res = await conn.query(addNewDepartmentQuery, name);
    console.log(`
        ${name} Added!
        `);
    return res;
}

module.exports = { addEmployee, addRole, addDepartment };