const ImageKit = require('imagekit');

let imagekitInstance = null;
function getImageKit(){
    if(imagekitInstance) return imagekitInstance;
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || process.env.IMAGEKIT_URL;
    if(!urlEndpoint){
        throw new Error('IMAGEKIT_URL (or IMAGEKIT_URL_ENDPOINT) environment variable is not set');
    }
    imagekitInstance = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: urlEndpoint
    });
    return imagekitInstance;
}

async function uploadFile(file, fileName){
    const imagekit = getImageKit();
    const result = await imagekit.upload({
        file: file,
        fileName: fileName
    });
    return result;
}

module.exports = {
    uploadFile
};
