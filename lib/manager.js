const { selectEmployeesByMgrQuery } = require('./queries.js');
const { makeTable } = require('./tables.js');

async function makeManagerTable(conn, manager) {
    employees = await conn.query(selectEmployeesByMgrQuery, manager);
    console.log(`
==== ${manager} ====`);
    makeTable(employees[0]);
}

module.exports = { makeManagerTable };