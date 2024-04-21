const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})


async function getLoginId(id) {
    const result = await new Promise((resolve, reject) => {
        connection.query("select * from prof_data where login_id = ? ", [id], (error, results, fields) => {
            if (error) throw error;
            resolve(results)
        });
    });
    
    return result[0];

}

async function postLogin(login) {
    const result = await new Promise((resolve, reject) => {
        connection.query(`select * from logins where login =?`,[login], (err, result, filds) => {
            if (err) throw err;

            resolve(result[0]);
        })
    }); 

    return result;
}

async function addAchiev(id) {
    await new Promise((resolve, reject) => {
        connection.query(`insert into ach_prof(ach_id, prof_id) values (?,?)`,[1,id], (err, results, fileds) => {
            if (err) {
                reject(err.code);
            }else{
                resolve(200)
            }
        })
    })
    .then(result =>  {return result})
    .catch(err => {return err})
}

async function postRegisterLogin(login, hash) {
    
    const result = await new Promise((resolve, reject) => {
        connection.query(`insert into logins(login, hash) values (?,?)`, [login, hash], (err, result, filds) => {
            try {
                if (err) throw err;
                resolve(true)
            }catch (error) {
                reject(error.code);
            }
        })
    }).then(result => result).catch(err => err);

    return result;

    
}

async function postRegisterProfile(fname, sname, email, lvl, image, role, login_id) {
    
    new Promise((resolve, reject) => {
        connection.query(`insert into prof_data(fname, sname, email, lvl, image, role, login_id) values (?,?,?,?,?,?,?)`, [fname, sname, email, lvl, image, role, login_id], (err, result, filed) => {
            if (err) {
                reject(err.code);
            }else{
                resolve(200)
            }
        });
    })
    .then(result =>  {return result})
    .catch(err => {return err})
}

module.exports = {postLogin, postRegisterLogin, postRegisterProfile, getLoginId, addAchiev};