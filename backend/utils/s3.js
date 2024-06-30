import AWS from "aws-sdk";
AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        // region:process.env.AWS_region  
});
const s3 = new AWS.S3({   signatureVersion: 'v4',  })
var photoBucket = new AWS.S3({
    params: {
        Bucket: "mern-ecommerce-project"
    }
})
export const uploadFile = (file) => {
    photoBucket.upload({
        Key: file.originalname,
        Body: file.buffer, 
        // file upload by below name
        ContentType: file.mimetype  // force download if it's accessed as a top location
    },(err, response)=>{
        console.log(err, response)
    });
}