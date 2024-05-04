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


async function getWaitingProfile(req, res) {

    const prof_id = jwt.verify(req.cookies["aToken"], process.env.secret_key).prof_id;
    const result = await profService.getWaitingProfile(prof_id);

    if(Array.isArray(result)) res.status(200).json(result);
    else res.status(400).json(result);

}

async function getWaitingPhoto(req, res) {
    console.log("object");
    const prof_id = jwt.verify(req.cookies["aToken"], process.env.secret_key).prof_id;
    console.log(prof_id, req.params.photo);
    const pathPhoto = await profService.getWaitingPhoto(prof_id, req.params.photo);

    res.download(pathPhoto,`${req.params.photo}`,(err) => { if(err) console.log(err); });
}



async function getUnAuth(req, res) {
    try {
        res.clearCookie("aToken").status(200).json("UnAuth");
    } catch (error) {
        res.status(500).end();
    }
    
}
module.exports = { getInfProfile, getCatchedProfile, postSendStatistic, getDownIcon, getUnAuth, getWaitingProfile, getWaitingPhoto};