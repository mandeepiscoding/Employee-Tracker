const {
    selectIdByEmpNameQuery,
    selectIdByRoleQuery,
    selectIdByDeptQuery,
} = require('./queries.js');

async function getEmployeeId(conn, name) {
    const res = await conn.query(selectIdByEmpNameQuery, name);
    const managerId = res[0][0].id;
    return managerId;
}

async function getRoleId(conn, title) {
    const res = await conn.query(selectIdByRoleQuery, title);
    const roleId = res[0][0].id;
    return roleId;
}

async function getDeptId(conn, name) {
    const res = await conn.query(selectIdByDeptQuery, name);
    const deptId = res[0][0].id;
    return deptId;
}

module.exports = { getEmployeeId, getRoleId, getDeptId };