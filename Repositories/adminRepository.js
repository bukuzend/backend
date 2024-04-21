const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})


async function getList() {
    
    const result = await new Promise((resolve, reject) => {
        connection.query("select * from statistics", (err, results, fileds) => {
            if (err) throw err;

            resolve(results);
        });
    });

    return result;
}

async function getRequest(id) {
    
    const result = await new Promise((resolve, reject) => {
        connection.query("select * from statistics as stat " +
        "join dragonflys as drg on drg.dragon_id = stat.dragon_id " +
        "where stat_id = ? ",[id], (err, results, fileds) => {
            if (err) throw err;

            resolve(results);
        });
    });

    return result[0];
}


async function getLoginIdAndDragonId(login, dragon) {
    const result = await new Promise((resolve, reject) => {
        connection.query("select * from archive_dragons, archive_users " +
        "where name = ? and login = ?", [dragon, login], (err, results, fileds) => {
            if (err) throw err;

            resolve(results);
        });
    })

    return result[0];
    
}

async function postRequest(stat_id, login_id, dragon_id, veracity) {
    return await new Promise((resolve, reject) => {
        connection.query("insert into archive_statistics(stat_id, geo_loc, date, image, users_id, dragon_id, veracity) " +
        "select stat_id, geo_loc, date, image, ?, ?, ? " +
        "from statistics where stat_id = ?", [login_id, dragon_id, veracity, stat_id])

        resolve(true);
    })
}

async function delStat(stat_id) {
    return await new Promise((resolve, reject) => {
        connection.query("delete from statistics where stat_id = ?", [stat_id], (err, results, fileds) => {
            if (err) throw err;

            resolve(true);
        })
    })
}

module.exports = { getList, getRequest, getLoginIdAndDragonId, postRequest, delStat };