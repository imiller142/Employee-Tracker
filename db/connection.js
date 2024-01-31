import mysql2 from 'mysql2';
const mysql = mysql2;

const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password1',
    database: 'employees'
});

export { db };
