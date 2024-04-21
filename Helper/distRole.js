const profRepository = require("./helpRep");

async function checkRole(req, res, next) {
    
    const profile = await profRepository.getProfile(req.body.profileId);
    if(profile.role){
        res.status(200);
        next()
    }else {
        res.status(404);
        res.end();
    }
}

module.exports = { checkRole }