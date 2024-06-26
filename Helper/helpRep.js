const mysql = require('mysql');

const connection = mysql.createPool({
    connectionLimit : 100,
    host: process.env.host_db,
    user: process.env.user_db,
    password: process.env.password,
    database: process.env.database
})

async function getLoginId(id) {
    const result = await new Promise((resolve, reject) => {
        connection.query("select log.login_id, login from logins as log " +
        "join prof_data as pd on pd.login_id = log.login_id " +
        "where pd.prof_id = ?", [id], (error, results, fields) => {
            try {
                if (error) throw error;
                resolve(results);
            }catch (error) {
                
                console.log(error.code);
            }
        });
    });
    return result[0];
}

async function getLogin(id) {
    const result = await new Promise((resolve, reject) => {
        connection.query("select * from logins where login_id = ?", [id], (err, results, fields) => {
            try {
                if (err) throw err;

                resolve(results);
            } catch (error) {
                console.log(error.code);
            }
        })
    });

    return result[0];   
}

async function getProfile(id) {
    const result = await new Promise((resolve, reject) => {
        connection.query("select * from prof_data where prof_id = ?", [id], (error, results, fields) => {
            try {
                if (error) throw error;
                resolve(results)
            } catch (error) {
                console.log(error.code);
            }
        });
    });

    return result[0];
}

async function getArchProfile(login) {
    const result = await new Promise((resolve, reject) => {
        connection.query("select * from archive_users where login = ?", [login], (err, results, fields) => {
            try {
                if (err) throw err;
                resolve(results[0]);
            } catch (error) {
                console.log(error.code);
            }
        })
    })

    return result;

}
module.exports = { getLoginId, getProfile, getLogin, getArchProfile };