const { selectEmployeesByDeptQuery } = require('./queries.js');
const { makeTable } = require('./tables.js');

async function makeDepartmentTable(conn, department) {
    employees = await conn.query(selectEmployeesByDeptQuery, department);
    console.log(`
==== ${department} ====`);
    makeTable(employees[0]);
}

module.exports = { makeDepartmentTable };