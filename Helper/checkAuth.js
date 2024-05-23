const jwt = require('jsonwebtoken');

async function checkAuth(req, res, next) {
    const aToken = req.cookies["aToken"];
    console.log("auth");
    // console.log(aToken);

    if(aToken){
        try {
            const payLoad = jwt.verify(aToken, process.env.secret_key);
            req.body.profileId = payLoad.prof_id;
            next()
        } catch (err) {
            console.log(err);
            res.status(404);
            res.json("Wrong token");
        }
    }else {
        console.log("auth_token_nothing");
        res.status(403);
        res.json("Token don't exist");
    }

    
};

async function checkLogin(req, res, next) {

    const aToken = req.cookies["aToken"];


    if(!aToken){
        !req.body.login ? res.status(400).json("unlogined") : next();
        
    }else {
        try {
            const payLoad = jwt.verify(aToken, process.env.secret_key);
            req.body.profileId = payLoad.prof_id;
            res.status(300);
            res.json("authed");
        } catch (err) {
            console.log(err);
            res.status(404);
            res.json("Wrong token");
        }
    }
}

module.exports = { checkAuth, checkLogin };
