const path = require('path');

const authRepository = require("../Repositories/authRepository");


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { error } = require("console");

async function postLogin(login, password) {
    const loginInf = await authRepository.postLogin(login);  

    const compPass = await bcrypt.compare(password, loginInf.hash); 

    if(!loginInf || !compPass){
        return false;
    }

    const profile = await authRepository.getLoginId(loginInf.login_id);

    return jwt.sign({
        prof_id: profile.prof_id,
    }, process.env.secret_key, { expiresIn: "1d"})

}

async function postRegister(body) {

    const { login, password } = body;
    const { fname, sname, email } = body;

    const salt = Number(process.env.bcrypt_salt);
    try {
        const hashPass = await bcrypt.hash(password, salt);

        const result = await authRepository.postRegisterLogin(login, hashPass);
        const newUserId = await authRepository.postLogin(login);
        await authRepository.postRegisterProfile(fname, sname, email, 1, "profile.svg", 0, newUserId.login_id);


        const loginInf = await authRepository.postLogin(login);
        const profile = await authRepository.getLoginId(loginInf.login_id);
        authRepository.addAchiev(profile.prof_id);

        
        const pathDir = path.join(__dirname,"..", "Users",login);
        
        console.log(result);
        return result;
    } catch (error) {
        console.log("error");
        return error;
    }
}

module.exports = {postLogin, postRegister};