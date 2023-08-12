import express, { Express } from 'express';
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import cors from 'cors';
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';
import { taskRouter } from './src/tasks/tasks.router';

//instantiate express app
const app: Express = express();
dotenv.config()
// console.log(app);

//Parse request Body
app.use(bodyParser.json())

// use CORS install types as well
app.use(cors())

//Create Database Connection
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [Task],
    synchronize: true, //
});
// console.log(AppDataSource);



// Define server port
const port = process.env.PORT



AppDataSource.initialize().then(() => {
    app.listen(port)
    console.log('data source has been initialized');
}).catch((e) => {
    console.error("Error during Data Source initialization", e);

})

app.use('/', taskRouter)

