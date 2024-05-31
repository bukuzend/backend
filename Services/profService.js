const profRepository = require("../Repositories/profRepository");
const getDate = require("../Helper/getDate");
const helpRep = require("../Helper/helpRep");
const s3Client = require('../Helper/awsClient')

const path = require('path');
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");


async function getProfile(username) {
    const result = await profRepository.getProfile(username);
    return result;
}

async function getDownIcon(id) {
    const getIcon = await helpRep.getProfile(id);
    const getPath = path.join(__dirname, "..", "Users", getIcon.image);


    return getPath;
}

async function getCatched(prof_id) {
    const user = await helpRep.getLoginId( prof_id );
    const ArchUser = await helpRep.getArchProfile(user.login);
    const result = await profRepository.getCatched(ArchUser.users_id);/////?

    const catched = []
    for(let item of result){
        let a = await profRepository.getDragonId(item.dragon_id);
        catched.push(
            {
                dragon:a,
                date:item.date,
                image:item.image,
            }
        );
    }

    return catched;
}



async function postSendStatistic(location,prof_id,dragon,path, login, buffer) {
    const user = await helpRep.getLoginId( prof_id );
    const dragonId = await profRepository.getIdDragon(dragon);

    const result = await profRepository.postSendStatistic(location, user.login_id, dragonId, path, getDate().date);
    if(result===true){

        await s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.bucket,
                Key:`${login}/${path}`,
                Body: buffer
            })
        ).then(res => console.log("success send file to storage"))
        .catch(err => console.log(err));

        return true;

        
    }else return result
    
}


async function getWaitingProfile(profId) {

    const user = await helpRep.getLoginId( profId );
    const result = await profRepository.getWaitingProfile(user.login_id);
    return result;

}


async function getWaitingPhoto(profId, photo) {
    const user = await helpRep.getLoginId( profId );

    return await s3Client.send(
        new GetObjectCommand({
            Bucket: process.env.bucket,
            Key:`${user.login}/${photo}`
        })
    )
    .then( res => res.Body.transformToByteArray())
    .then(data => {
        console.log("success get wainting file");
        const buffer  = Buffer.from(data);
        return buffer;
    })
    .catch(err => {
        console.log("failed get waiting file");
        return false;
     });  
}


module.exports = { getProfile, getCatched, postSendStatistic, getDownIcon, getWaitingProfile, getWaitingPhoto };