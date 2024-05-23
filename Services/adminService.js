const adminRepository = require('../Repositories/adminRepository');
const helpRep = require("../Helper/helpRep");
const profRepository = require("../Repositories/profRepository");



async function getList() {
    return await adminRepository.getList();
}

async function getRequest(id) {
    return await adminRepository.getRequest(id);
}

async function postRequest(stat_id, geo_loc, date, veracity, image, dragon_id,login_id) {

    const statRow = await adminRepository.getRequest(stat_id);

    const { login } = await helpRep.getLogin(statRow.login_id);

    const { users_id } = await adminRepository.getLoginId(login);


    // if(veracity) await adminRepository.plusLvl(login_id)
    await adminRepository.postRequest(stat_id, geo_loc, date, veracity, image, users_id,dragon_id);
    return true;
}


module.exports = { getList, postRequest, getRequest };