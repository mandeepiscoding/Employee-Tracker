const {
    selectEmployeesQuery,
    selectRolesQuery,
    selectDeptQuery,
    selectManagersQuery,
} = require('./queries.js');

async function updateRoleArray(conn, questions, index) {
    const roleData = await conn.query(selectRolesQuery);
    roleArray = roleData[0].map((role) => role.Title);
    questions[index].choices = roleArray;
    return questions;
}

async function updateEmployeeArray(conn, questions, index, isManager) {
    const empData = await conn.query(selectEmployeesQuery);
    empArray = empData[0].map((emp) => `${emp.First} ${emp.Last}`);
    if (isManager) {
        empArray.unshift('None');
    }
    questions[index].choices = empArray;
    return questions;
}

async function updateDeptArray(conn, questions, index) {
    const deptData = await conn.query(selectDeptQuery);
    deptArray = deptData[0].map((dept) => dept.Name);
    questions[index].choices = deptArray;
    return questions;
}

async function updateManagerArray(conn, questions, index) {
    const managerData = await conn.query(selectManagersQuery);
    managerArray = managerData[0].map((mgr) => mgr.manager_name);
    questions[index].choices = managerArray;
    return questions;
}

module.exports = {
    updateRoleArray,
    updateEmployeeArray,
    updateDeptArray,
    updateManagerArray,
};