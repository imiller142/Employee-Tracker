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

    }

    connect() {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password1',
            database: 'employees'
        });
    }


    getAllEmployees() {
        const db = this.connect()
        db
            .promise()
            .query(`SELECT
            employee.id,
            employee.first_name,
            employee.last_name,
            roles.title
            department.name AS department
            CONCAT(e2.first_name, ' ', e2.last_name) AS manager
            FROM employee
            LEFT JOIN roles ON emp_role_id = employee.emp_role_id
            LEFT JOIN department on department.id = emp_role.department_id
            LEFT JOIN employee AS e2 ON e2.id = employee.manager_id
            `
            )
            .then(([rows, fields]) => {
                console.table(rows);
            })
            .catch(console.log)
            .then(() => db.end());
    }

    getAllRoles() {
        const db = this.connect();
        db
            .promise()
            .query(`SELECT * FROM roles`)
            .then(([rows, fields]) => {
                console.table(rows);
            })
            .catch(console.log)
            .then(() => db.end());
    }
}

const data = new Queries();

data.getAllRoles();
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

