const mysql = require('mysql2/promise')
const dbconfig = require('../config/db_config')
//Global database connection variable
var connection
var functions = {
    //connecting database
    connect: async () => {
        try {
            connection = await mysql.createConnection(dbconfig.config);
            const viewStudents = "SELECT * FROM income_table;"
            const [rows, fields] = await connection.query(viewStudents);
            console.log(rows);
            return connection;
        }
        catch (err) {
            console.error(err);
            return null;
        }

    },
    getData:async(req,res)=>{
        try {
            const getQuery = "SELECT DISTINCT income_table.Ticker FROM income_table;"
            const [rows, fields] = await connection.query(getQuery);
            res.json({
                "success":true,
                "msg":"successfully fetched",
                "rows":JSON.stringify(rows),
            })
        }
        catch (err) {
            res.json({
                "success":false,
                "msg":"failed to fetch",
            })
            console.error(err);
        }


    },
    getTickerDataByName:async(req,res)=>{
        try {
            console.log(req.body.Ticker);
            const getQuery = "SELECT * FROM income_table where Ticker=?;"
            const [rows, fields] = await connection.query(getQuery,[req.body.Ticker]);
            res.json({
                "success":true,
                "msg":"successfully fetched",
                "rows":JSON.stringify(rows),
            })
        }
        catch (err) {
            res.json({
                "success":false,
                "msg":"failed to fetch",
            })
            console.error(err);
        }


    }
    

}
module.exports = functions;