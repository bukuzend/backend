const profRepository = require("../Repositories/profRepository");
const getDate = require("../Helper/getDate");
const helpRep = require("../Helper/helpRep");

const path = require('path');



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
                date:item.date
            }
        );
    }

    return catched;
}



async function postSendStatistic(location,prof_id,dragon,path) {
    const user = await helpRep.getLoginId( prof_id );
    const dragonId = await profRepository.getIdDragon(dragon);

    const result = await profRepository.postSendStatistic(location, user.login_id, dragonId, path, getDate().date);
    return result === true ?  true :  result;
}


async function getWaitingProfile(profId) {

    const user = await helpRep.getLoginId( profId );
    const result = await profRepository.getWaitingProfile(user.login_id);
    return result;

}


async function getWaitingPhoto(profId, photo) {
    const user = await helpRep.getLoginId( profId );

    return path.join(__dirname, "..", "Users", user.login, photo);


}


module.exports = { getProfile, getCatched, postSendStatistic, getDownIcon, getWaitingProfile, getWaitingPhoto };