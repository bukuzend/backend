const mysql = require('mysql');

const connection = mysql.createPool({
    connectionLimit : 100,
    host: process.env.host_db,
    user: process.env.user_db,
    password: process.env.password,
    database: process.env.database
})

async function getList() {
    console.log("get");
    const result = await new Promise((resolve, reject) => {
        connection.query("select * from dragonflys", (error, results, fields) => {
            try {
                if (error) throw error;
                resolve(results);
            } catch (error) {
                
                console.log(error);
            }
            
        })
    });

    return result;
}


async function getDragon(name) {
    const result = await new Promise((resolve, reject) => {
        connection.query("select name, description, image from dragonflys where name=?",[name], (error, results, fields) => {
            try {
                if (error) throw error;
                resolve(results);
            } catch (error) {
                console.log(error.code);
            }
        })
    });
    return result[0];
}


module.exports = { getList, getDragon };