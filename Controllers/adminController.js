const adminService = require('../Services/adminService');
const path = require('path');


async function getList(req, res) {
    try {
        const result = await adminService.getList();
        res.send(result);
    }
    catch (err) {
        res.status(500).send("Error of getting list of statistics");
    }
    
}

async function getRequest(req, res) {

    try {
        const { id }  = req.params;
        console.log(id);

    const result = await adminService.getRequest(id);
    res.send( result );
    }
    catch (err) {
        res.status(500).send("Error of getting request");
    
    }

}


async function getImage(req, res) {
    const { image } = req.params;
    const user = image.split('-')[0];
    console.log(user);
    try {
        console.log("dwadwa");
        const pathPhoto = path.join(__dirname, "..", "Users", user, image);
        console.log(pathPhoto);
        res.download(pathPhoto,`${image}`,(err) => { if(err) console.log(err); });
    }
    catch (err) {
        res.status(500);
    }
    

}

async function postRequest(req, res) {

    try{
        const { stat_id, geo_loc, date, veracity, image, dragon_id, login_id } = req.body;
    
        await adminService.postRequest(stat_id, geo_loc, date, veracity, image, dragon_id, login_id); 
        res.end();
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error of veracity");
    }

    
}


module.exports = { getList, postRequest, getImage, getRequest };