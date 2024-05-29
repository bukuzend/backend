const libService = require("../Services/libService");
const path = require("path");

async function getDragons(req, res) {
    const listDragons = await libService.getList();
    res.json(listDragons);
}

async function getDragon(req, res) {

    const Dragon = await libService.getDragon(req.params.dragName);
    res.json(Dragon);
}

async function getDragonImg(req, res) {
    const Dragon = await libService.getDragon(req.params.dragName);
    
    const pathGet = path.join(__dirname, "..", "Dragonflys", Dragon.image);

    res.download(pathGet,`${Dragon.name}.jpeg`, (err) => {
        console.log(err);
    });
}

module.exports = { getDragons, getDragon, getDragonImg };