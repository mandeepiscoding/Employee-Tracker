const mainMenuQuestions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'topMenu',
        choices: [
            'View All Employees',
            'View Employees By Manager',
            'View Employees By All Managers',
            'View Employees By Department',
            'View Employees By All Departments',
            'Add Employee',
            'Update Employee Role',
            'Update Employee Manager',
            'Remove Employee',
            'View All Roles',
            'Add Role',
            'Remove Role',
            'View All Departments',
            'Add Department',
            'Remove Department',
            'Quit',
        ],
    },
];

const addDepartmentQuestions = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'name',
    },
];

const addRoleQuestions = [
    {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'title',
    },
    {
        type: 'input',
        message: (answers) => `What is the salary for the ${answers.title}?`,
        name: 'salary',
        validate: function (input) {
            if (!/[0-9]/.test(input)) {
                return 'Please enter a valid number.';
            }
            return true;
        },
    },
    {
        type: 'list',
        message: (answers) =>
            `What department does the ${answers.title} belong to?`,
        name: 'department',
        choices: [],
    },
];

const addEmployeeQuestions = [
    {
        type: 'input',
        message: 'What is the employee\'s first name?',
        name: 'first_name',
    },
    {
        type: 'input',
        message: (answers) => `What is ${answers.first_name}'s last name?`,
        name: 'last_name',
    },
    {
        type: 'list',
        message: (answers) => `What is ${answers.first_name}'s role?`,
        name: 'role',
        choices: [],
    },
    {
        type: 'list',
        message: (answers) => `Who is  ${answers.first_name}'s manager?`,
        name: 'manager',
        choices: [],
    },
];

const updateEmpRoleQuestions = [
    {
        type: 'list',
        message: 'Which employee\'s role do you wish to update?',
        name: 'name',
        choices: [],
    },
    {
        type: 'list',
        message: (answers) =>
            `Which role do you want to assign to ${answers.name}?`,
        name: 'role',
        choices: [],
    },
];

const updateEmpMgrQuestions = [
    {
        type: 'list',
        message: 'Which employee\'s manager do you wish to update?',
        name: 'name',
        choices: [],
    },
    {
        type: 'list',
        message: (answers) =>
            `Which manager do you want to assign to ${answers.name}?`,
        name: 'manager',
        choices: [],
    },
];

const viewByManagerQuestions = [
    {
        type: 'list',
        message: 'Which manager\'s employees would you like to see?',
        name: 'name',
        choices: [],
    },
];

const viewByDepartmentQuestions = [
    {
        type: 'list',
        message: 'Which department\'s employees would you like to see?',
        name: 'name',
        choices: [],
    },
];

const deleteEmployeeQuestions = [
    {
        type: 'list',
        message: 'Which employee would you like to remove?',
        name: 'name',
        choices: [],
    },
];

const deleteRoleQuestions = [
    {
        type: 'list',
        message: 'Which role would you like to remove?',
        name: 'name',
        choices: [],
    },
];

const deleteDepartmentQuestions = [
    {
        type: 'list',
        message: 'Which department would you like to remove?',
        name: 'name',
        choices: [],
    },
];

module.exports = {
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
};