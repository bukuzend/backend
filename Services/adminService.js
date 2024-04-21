const adminRepository = require('../Repositories/adminRepository');
const helpRep = require("../Helper/helpRep");
const profRepository = require("../Repositories/profRepository");


async function getList() {
    return await adminRepository.getList();
}

async function getRequest(id) {
    return await adminRepository.getRequest(id);
}


async function postRequest(stat_id, veracity) {

    const statRow = await adminRepository.getRequest(stat_id);

    const { login } = await helpRep.getLogin(statRow.login_id);
    const getDragon = await profRepository.getDragonId(statRow.dragon_id);

    const { users_id, dragon_id } = await adminRepository.getLoginIdAndDragonId(login, getDragon);

    await adminRepository.postRequest(stat_id, users_id, dragon_id, veracity);
    await adminRepository.delStat(stat_id);
    return null;
}


module.exports = { getList, getRequest, postRequest };