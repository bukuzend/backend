const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

async function getLoginId(id) {
    const result = await new Promise((resolve, reject) => {
        connection.query("select log.login_id, login from logins as log " +
        "join prof_data as pd on pd.login_id = log.login_id " +
        "where pd.prof_id = ?", [id], (error, results, fields) => {
            if (error) throw error;
            resolve(results)
        });
    });

    return result[0];
}

async function getLogin(id) {
    const result = await new Promise((resolve, reject) => {
        connection.query("select * from logins where login_id = ?", [id], (err, results, fields) => {
            if (err) throw err;

            resolve(results);
        })
    });

    return result[0];   
}

async function getProfile(id) {
    const result = await new Promise((resolve, reject) => {
        connection.query("select * from prof_data where prof_id = ?", [id], (error, results, fields) => {
            if (error) throw error;
            resolve(results)
        });
    });

    return result[0];
}

async function getArchProfile(login) {
    const result = await new Promise((resolve, reject) => {
        connection.query("select * from archive_users where login = ?", [login], (err, results, fields) => {
            if (err) throw err;

            resolve(results[0]);
        })
    })

    return result;

}
module.exports = { getLoginId, getProfile, getLogin, getArchProfile };