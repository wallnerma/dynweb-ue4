const fs = require('fs');

// HINT: A model isn't aware that it's data is going to be shown as a webpage, follow these rules:
//  1: a model doesn't know where the input data (such as function parameters) comes from, thus it has no idea that input data is from an HTTP request or from a unit test or from anywhere else
//  2: a model doesn't know what is going to be done with the data it returns to the outside. This is simply not the business of the model
//  3: a model (as every module shall be by the way) is very shy to reveal it's inner workings if not necessary.

/**
 * Builds a galleries data structure from filesystem contents
 * @param doneHandler a function called when reading out galleries has been finished
 */
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
    // Hint: to the outside, other components that use the galleries model don't know that the galleries array is constructed from the filesystem.
    // Yet, we name the internal function getGalleriesFromFS so that it is obvious to us developers that galleries are constructed from the file system. What's
    // the point here? It saves the time that we otherwise would need to look throught the implementation of the function to see that the function reads
    // from the filesystem.
    getGalleries: getGalleriesFromFS
};