import mysql from 'mysql2'
import 'console.table'

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password1',
//     database: 'employees'
// });

export class Queries {

    constructor() {

        this.db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password1',
            database: 'employees'
        });

    }



    getAllEmployees() {
        
        this.db
            .promise()
            .query(`SELECT
            employee.id,
            employee.first_name,
            employee.last_name,
            roles.title,
            department.name as department,
            CONCAT(e2.first_name, ' ', e2.last_name) AS manager
            FROM employee
            LEFT JOIN roles ON roles.id = employee.role_id
            LEFT JOIN department on department.id = roles.department_id
            LEFT JOIN employee AS e2 ON e2.id = employee.manager_id
            `
            )
            .then(([rows, fields]) => {
                console.table(rows);
            })
            .catch(console.log);
    }

    getAllRoles() {
        this.db
            .promise()
            .query(`SELECT
                    roles.title,
                    roles.id,
                    roles.salary,
                    department.name as department
                    from roles
                    left join department on roles.department_id = department.id`)
            .then(([rows, fields]) => {
                console.table(rows);
            })
            .catch(console.log);
    }

    getAllDepartments() {
        this.db
            .promise()
            .query(`Select * from department`)
            .then(([rows, fields]) => {
                console.table(rows);
            })
            .catch(console.log);
    }

    addDepartment(name) {
        this.db
            .promise()
            .query(`Insert into department (name)
                    values (?)`, [name])
            .catch(console.log);
    }

    addRole(name, salary, department_id) {
        this.db
            .promise()
            .query(`insert into roles (title, salary, department_id)
                    values (?,?,?)`, [name, salary, department_id])
            .catch(console.log);
    }

    updateEmployee(role, id) {
        this.db
            .promise()
            .query(`update employee
                    set role_id = ?
                    where id = ?`, [role, id])
            .catch(console.log)
    }
}

const data = new Queries();

data.updateEmployee(1, 1);
data.getAllEmployees();

// class Queries {
//     constructor(db) {
//         this.db = db
//     };

//     getAllEmployees() {
//         try{
//             const [results, fields] = await this.db.query(
//                 `SELECT * FROM employee`
//             );
//             console.log(results);
//             console.log(fields)
//         } catch(err) {
//             console.log(err)
//         }
//     };
// }

// const data = new Queries(db);

// data.getAllEmployees();

