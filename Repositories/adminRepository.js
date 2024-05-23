const mysql = require('mysql');

const connection = mysql.createPool({
    connectionLimit : 100,
    host: process.env.host_db,
    user: process.env.user_db,
    password: process.env.password,
    database: process.env.database
})


async function getList() {
    
    const result = await new Promise((resolve, reject) => {
        connection.query("select *, st.image from statistics as st " +
        "join dragonflys as dr on dr.dragon_id = st.dragon_id ", (err, results, fileds) => {
            try {
                if (err) throw err;
                resolve(results);
            }catch (e) {
                
                console.log(e.code);
            }
            
        });
    });

    return result;
}

async function getRequest(id) {
    
    const result = await new Promise((resolve, reject) => {
        connection.query("select * from statistics as stat " +
        "join dragonflys as drg on drg.dragon_id = stat.dragon_id " +
        "where stat_id = ? ",[id], (err, results, fileds) => {
            try {
                if (err) throw err;
                resolve(results);
            } catch (error) {
                console.log(err.code);
            }
        });
    });

    return result[0];
}


async function getLoginId(login) {
    const result = await new Promise((resolve, reject) => {
        connection.query("select * from archive_users where login = ?", [login], (err, results, fileds) => {

            try {
                if (err) throw err;
                resolve(results);
            } catch (error) {
                console.log(error.code);
            }
            
        });
    })

    return result[0];
    
}

async function postRequest(stat_id, geo_loc, date, veracity, image, users_id,dragon_id) {
    await new Promise((resolve, reject) => {
        connection.query("insert into archive_statistics(stat_id, geo_loc, date, veracity, image, users_id,dragon_id) values(?,?,?,?,?,?,?); ",
        [stat_id, geo_loc, date, veracity, image, users_id,dragon_id], (err, results, fileds) => {
        try {
            if (err) throw err;
            resolve(true);
        } catch (error) {
            console.log(error.code);
        }})
    })

    await connection.query("delete from statistics where stat_id = ?", [stat_id], (err, results, fileds) => {
        try {
            if (err) throw err;
            resolve(true);
        } catch (error) {
            console.log(error.code);
        }})
    console.log("win");
}


async function plusLvl(id){
    await new Promise((resolve, reject) => {
        connection.query("update prof_data set lvl = lvl + 1 where login_id =?", [id], (err, results, fileds) => {
            try {
                if (err) throw err;
                resolve(true);
            } catch (error) {
                console.log(error.code);
            }})
    })
}

module.exports = { getList, getRequest, getLoginId, postRequest, plusLvl };