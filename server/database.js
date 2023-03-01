import mysql2 from "mysql2"
import dotenv from "dotenv"

dotenv.config()



export const db = mysql2.createConnection({
    host: "localhost" ,//process.env.HOST,
    user: "root",//process.env.USERNAME,
    password: "aaa123", //process.env.PASSWORD,
    database: "blog" //process.env.NAME,
})