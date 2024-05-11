const multer = require('multer');
const getDate = require('./getDate');
const path = require('path');
const jwt = require('jsonwebtoken');

const { getLoginId } = require("./helpRep");


const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const getLogin = await getLoginId( jwt.verify(req.cookies["aToken"], process.env.secret_key).prof_id);
        const getPath = path.join(__dirname, "..", "Users", getLogin.login)
        console.log(getPath);
        cb(null, getPath);
    },
    filename: async function (req, file, cb) {
        console.log("pre");
        const getLogin = await getLoginId( jwt.verify(req.cookies["aToken"], process.env.secret_key).prof_id);
        console.log(`${getLogin.login}-${getDate().getPath}.jpeg`);
        cb(null, `${getLogin.login}-${getDate().getPath}.jpeg`);
    }
});

// const storage = multer.diskStorage({
//     destination: async function (req, file, cb) {
//         const getPath = path.join(__dirname, "..", "Users")
//         cb(null, getPath);
//     },
//     filename: async function (req, file, cb) {
//         cb(null, `login.` + "jpeg" );
//     }
// });


module.exports = multer({storage});