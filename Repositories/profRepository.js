const mysql = require('mysql');

const connection = mysql.createPool({
    connectionLimit : 100,
    host: process.env.host_db,
    user: process.env.user_db,
    password: process.env.password,
    database: process.env.database
})

async function getProfile(id) {

    const result = await new Promise((resolve, reject) => {
        connection.query("select fname, sname, lvl, pd.image as prof_image, ach.name, ach.image as ach_image from prof_data as pd " +
        "join ach_prof as ap on ap.prof_id = pd.prof_id " +
        "join achievements as ach on ach.ach_id = ap.ach_id" +
        " where pd.prof_id = ?", [id], (error, results, fields) => {
            try {
                if (error) throw error;
                resolve(results)
            } catch (error) {
                console.log(error.code);
            }
        });
    });
    return result;
}


async function getCatched(Id) {
    const result = await new Promise((resolve, reject) => {
        connection.query("select dragon_id, date, image from archive_statistics where users_id = ? and veracity = true",[Id], (error, results, fields) => {
            try {
                if (error) throw error;
                resolve(results);
            } catch (error) {
                console.log(error.code);
            }
        });
    });
    return result;
}



async function getDragonId(Id) {
    const result = await new Promise((resolve, reject) => {
        connection.query("select name from dragonflys where dragon_id = ?",[Id], (error, results, fields) => {
            try {
                if (error) throw error;
                resolve(results[0].name);
            } catch (error) {
                console.log(error.code);
            }
        });
    });
    return result;
}

async function getIdDragon(dragon) {
    const result = await new Promise((resolve, reject) => {
        connection.query("select dragon_id from dragonflys where name = ?",[dragon], (error, results, fields) => {
            try {
                if (error) throw error;
                resolve(results);
            } catch (error) {
                console.log(error.code);
            }
        });
    });
    console.log(result);
    return result[0].dragon_id;
    
}


async function postSendStatistic(location, userId, dragonId, path, getDate) {
    const result = await new Promise((resolve, reject) => {
        connection.query("insert into statistics(geo_loc, image, login_id, dragon_id, date) values(?,?,?,?,?)",[location, path, userId, dragonId, getDate], (error, result, fields) => {
            try {
                if (error) throw error;
                resolve(true);
            } catch (error) {
                reject(error.code);
            }
            
        })
    });
    return result
    
}

async function getWaitingProfile(loginId) {
    const result = await new Promise((resolve, reject) => {
        connection.query("select st.date, st.geo_loc, st.image, name, description from statistics as st " +
        "join dragonflys as drg on drg.dragon_id = st.dragon_id " +
        "where login_id = ?",[loginId], (error, results, fields) => {
            try {
                if (error) throw error;
                resolve(results);
            } catch (error) {
                reject(error.code);
            }
        })
    });
    return result;
}


module.exports = { getProfile, getCatched, getDragonId, postSendStatistic, getIdDragon, getWaitingProfile };