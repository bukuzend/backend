const adminService = require('../Services/adminService');

async function getList(req, res) {
    const result = await adminService.getList();
    res.send(result);
}

async function getRequest(req, res) {

    const { id }  = req.params;
    console.log(id);

    const result = await adminService.getRequest(id);////////////////// add image
    res.send( result );
}

async function postRequest(req, res) {

    const { id } = req.params;
    const { veracity } = req.body;


    const result = await adminService.postRequest(id, veracity);
    res.end();
}


module.exports = { getList, getRequest, postRequest };