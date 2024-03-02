const { updateRoleQuery, updateManagerQuery } = require('./queries.js');

const updateEmpRole = async (conn, role_id, name, roleName) => {
    const res = await conn.query(updateRoleQuery, [role_id, name]);
    console.log(`
      ${name}'s role has been updated to ${roleName}!
      `);
    return res;
};

const updateEmpManager = async (conn, manager_id, name, managerName) => {
    let res;
    if (manager_id === 0) {
        res = await conn.query(updateManagerQuery, [null, name]);
    } else {
        res = await conn.query(updateManagerQuery, [manager_id, name]);
    }
    console.log(`
      ${name}'s manager has been updated to ${managerName}!
      `);
    return res;
};

module.exports = { updateEmpRole, updateEmpManager };