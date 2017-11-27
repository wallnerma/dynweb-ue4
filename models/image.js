const fs = require('fs');

function getImageFromFS(doneHandler, galleryKey, gallery) {
    const basePath = process.cwd() + '/public/galleries/';
    const galleryName = galleryKey;
    const galleryFilePath = basePath + galleryName;

    fs.readdir(galleryFilePath, 'utf8', function(error, files) {
        files.sort();
        files.forEach(function(fileName) {
            const imgRex = /\.jpg$|\.jpeg$|\.png$/i;
            if (imgRex.test(fileName)) {
                gallery.images.push({
                    imgUri: `/galleries/${galleryKey}/${fileName}`,
                    imgId: `${galleryKey}/${fileName}`,
                    label: fileName
                });
            }
        });
        doneHandler(galleryKey, gallery);
    });
}

module.exports = {
    getImage: getImageFromFS
};