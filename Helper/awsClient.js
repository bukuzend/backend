const {S3Client} = require("@aws-sdk/client-s3");


const params = {
    credentials: {
        accessKeyId: process.env.accesskeyid,
        secretAccessKey: process.env.secretaccesskey,
    },
    region: process.env.region,
    endpoint: process.env.endpoint,
}

const s3Client = new S3Client(params);

module.exports = s3Client