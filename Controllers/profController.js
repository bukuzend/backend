const profService = require("../Services/profService");
const jwt = require('jsonwebtoken');

async function getInfProfile(req, res) {
    const result = await profService.getProfile(req.body.profileId);
    res.json(result);
}

async function getDownIcon(req, res) {
    const pathImg = await profService.getDownIcon(req.body.profileId);
    res.download(pathImg);
}

async function getCatchedProfile(req, res) {
    console.log("1",req.body.profileId);
    const result = await profService.getCatched(req.body.profileId);
    res.json(result);
}

async function postSendStatistic(req, res) {
    console.log(req.body);
    try {
    const { location, dragon } = req.body;
    const prof_id = jwt.verify(req.cookies["aToken"], process.env.secret_key).prof_id;
    console.log(location, dragon, prof_id, req.file.filename);
    const result = await profService.postSendStatistic(location, prof_id,dragon, req.file.filename);

    if(!result) throw new Error("Something went wrong");

    res.status(200).json("OK");
    }catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }
    
}

async function getUnAuth(req, res) {
    try {
        res.clearCookie("aToken").status(200).json("UnAuth");
    } catch (error) {
        res.status(500).end();
    }
    
}
module.exports = { getInfProfile, getCatchedProfile, postSendStatistic, getDownIcon, getUnAuth};