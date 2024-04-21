const libRepository = require("../Repositories/libRepository");

async function getList() {
    const getList = await libRepository.getList();
    return getList;
}

async function getDragon(name) {
    const getList = await libRepository.getDragon(name);
    return getList;
}


module.exports = { getList, getDragon };