process.on('uncaughtException', () => {
    console.log("error in code");
})
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { connectDB } from './database/dbconnection.js';
import { bootstrap } from './src/bootstrap.js';
const app = express()
const port = 3000

dotenv.config({path:path.resolve('./config/.env')})

connectDB()



bootstrap(app,express)


process.on('unhandledRejection', (err) => {
    console.log('unhandled error', err);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))