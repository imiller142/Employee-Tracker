import { db } from './db/connection.js';
import 'console.table'
import { Queries } from './utils/dbquery.js';

await db.connect(err => {
    if (err) throw err;
    console.log('Database connected')

    let data = new Queries;

    console.log(data.getAllEmployees());
})

