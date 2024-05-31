const path = require("path");
// const { getCatched } = require("../Repositories/profRepository");
const profService = require("../Services/profService");
const jwt = require('jsonwebtoken');

const { getLoginId } = require("../Helper/helpRep");
const getDate = require('../Helper/getDate')

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
    const getLogin = await getLoginId( jwt.verify(req.cookies["aToken"], process.env.secret_key).prof_id);
    const filename = `${getLogin.login}-${getDate().getPath}.jpeg`;

    console.log(location, dragon, prof_id, filename);
    const result = await profService.postSendStatistic(location, prof_id,dragon, filename, getLogin.login, req.file.buffer);

    if(!result) throw new Error("Something went wrong");

    res.status(200).json("OK");
    }catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }
    
}


async function getCatchedPhoto(req, res)  {
    const prof_id = jwt.verify(req.cookies["aToken"], process.env.secret_key).prof_id;
    const photo = await profService.getWaitingPhoto(prof_id, req.params.photo);

    if(Buffer.isBuffer(photo)) res.status(200).send(photo);
    else res.status(400).json("photo not found");
}

async function getWaitingProfile(req, res) {

    const prof_id = jwt.verify(req.cookies["aToken"], process.env.secret_key).prof_id;
    const result = await profService.getWaitingProfile(prof_id);

    if(Array.isArray(result)) res.status(200).json(result);
    else res.status(400).json(result);
}

async function getWaitingPhoto(req, res) {
    const prof_id = jwt.verify(req.cookies["aToken"], process.env.secret_key).prof_id;
    console.log(prof_id, req.params.photo);
    const photo = await profService.getWaitingPhoto(prof_id, req.params.photo);

    if(Buffer.isBuffer(photo)) res.status(200).send(photo);
    else res.status(400).json("photo not found");
}



async function getUnAuth(req, res) {
    try {
        res.clearCookie("aToken").status(200).json("UnAuth");
    } catch (error) {
        res.status(500).end();
    }
    
}
module.exports = { getInfProfile, getCatchedProfile, postSendStatistic, getDownIcon, getUnAuth, getWaitingProfile, getWaitingPhoto, getCatchedPhoto};