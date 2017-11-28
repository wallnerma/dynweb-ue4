const fs = require('fs');

function getGalleriesFromFS(doneHandler) {
    const basePath = process.cwd() + '/public/galleries/';
    fs.readdir(basePath, 'utf8', function(err, files) {
        const galleries = [];
        if (err) {
            console.log(err);
        }

        // First let's filter all regular gallery directories
        const galleryDirNames = files.filter((fileName) => {
            const subDirPath = basePath + fileName;
            const stats = fs.statSync(subDirPath);
            const hasGalleryNamingConvention = /^\d{4}-\d{2}-\d{2}-[a-z0-9]*/i.test(fileName);
            return stats.isDirectory() && hasGalleryNamingConvention;
        });

        // Let's generate the list of gallery objects and call the doneHandler
        // when all callbacks have been executed. This is the difficulty of asynchronicity :(
        let numCallbacks = galleryDirNames.length;
        galleryDirNames.forEach(function(galleryDirName) {
            const subDirPath = basePath + galleryDirName;
            fs.readdir(subDirPath, function(err, files) {
                const imgRex = /\.jpg$|\.jpeg$|\.png$/i;
                const allImages = files.filter(fileName => {
                    return imgRex.test(fileName);
                });
                const hasImages = allImages.length > 0;
                if (hasImages) {
                    const galleryName = galleryDirName;
                    const galleryUri = '/galleries/' + galleryName;
                    const gallery = {
                        name: galleryName,
                        galleryUri: galleryUri,
                        galleryThumbUri: galleryUri + '/' + allImages[0],
                    };
                    galleries.push(gallery);
                }

                const isThisTheLastCallback = --numCallbacks === 0;
                if (isThisTheLastCallback) {
                    // Attention: we never know in which order callbacks are called,
                    // so we have to sort the result
                    galleries.sort((g1, g2) => {
                        return g1.name < g2.name;
                    });
                    doneHandler(galleries);
                }
            });
        });
    });
}

module.exports = {
    getGalleries: getGalleriesFromFS
};