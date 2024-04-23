const authService = require("../Services/authService");

async function postLogin(req, res) {
    const { login, password } = req.body;

    try {
        const result = await authService.postLogin(login, password);
        console.log(result);
        if(result) {
        res.cookie("aToken", result, {
            httpOnly: true,
            sameSite: "lax",
            secure: true 
        });}
        console.log("success");
    res.status(200).send();
    }catch (error) {
        res.status(400).json(error.status);
    }
    
};

async function postRegister(req, res) {
    try {
        const result = await authService.postRegister(req.body);
        console.log(result);
        if(result == true){
            console.log("object");
            res.status(200).send();
        }else{
            console.log("da");
            res.status(400).json(error);
        }
        
    } catch (error) {
        console.log("erewrwe");
        res.status(400).json(error);
    }
};



module.exports = { postLogin, postRegister };