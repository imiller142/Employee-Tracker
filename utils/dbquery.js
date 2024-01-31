import mysql from 'mysql2'

const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password1',
    database: 'employees'
});

export class Queries {
    constructor() {
        this.db = db
    };

    getAllEmployees() {
        try {
            const results = db.query(
                `SELECT * FROM roles`
            );
            return results;
        } catch (err) {
            console.log(err)
        }

    };
};

