const libService = require("../Services/libService");
const s3Client = require("../Helper/awsClient")

const path = require("path");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

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
    console.log(Dragon.image);

    await s3Client.send(
        new GetObjectCommand({
            Bucket: process.env.bucket,
            Key: 'Dragonflys/' + Dragon.image,
        })
    ).then( res => res.Body.transformToByteArray())
    .then( data  => {
        const buffer = Buffer.from(data.buffer);
        res.send(buffer);
    })
    .catch(err  =>  console.log(err));

}

module.exports = { getDragons, getDragon, getDragonImg };