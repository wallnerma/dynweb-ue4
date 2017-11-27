const express = require('express');
// TODO Clean up dependencies once they're no longer needed in a module, this is true for every module in general
const hbs = require('handlebars');
const util = require('util');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router = require('./router');

// TODO these dependencies will go away eventually once every functionality has been put into the MVC structure
// TODO Hint: In a perfectly structured MVC app, this starting script will be about 5 to 10 lines long. It's sole purpose is to create the express app, call the router to configure routes and then start the server
const layout = require('./views/layout');
const galleries = require('./models/galleries');

const app = express();

// const layout = hbs.compile(`<!DOCTYPE html>
//     <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <title>Photopick</title>
//             <style>
//                 html {
//                     font-family: sans-serif;
//                 }
//                 body {
//                     background-color: #eee;
//                     margin: 0;
//                 }
//
//                 .clearfix:before,
//                 .clearfix:after {
//                   content: " ";
//                   display: table;
//                 }
//                 .clearfix:after {
//                   clear: both;
//                 }
//                 .clearfix {
//                   *zoom: 1;
//                 }
//                 .container {
//                     margin: 0 auto;
//                     max-width: 1024px;
//                 }
//                 .subtle {
//                     color: #999;
//                 }
//
//                 footer {
//                   background-color: #eee;
//                   border-top: 1px solid #ddd;
//                   padding: 3em 0.5em;
//                 }
//                 header, header a {
//                     /*background: linear-gradient(180deg, #666, #333);*/
//                     background: linear-gradient(180deg, #665676, #433333);
//                     color: white;
//                     padding: 2em 0;
//                 }
//                 nav {
//                     display: inline;
//                 }
//                 nav a {
//                     margin: 0.75em 0.375em;
//                 }
//                 section.main {
//                     background-color: #fff;
//                     margin: 0;
//                     padding: 3em 0.5em;
//                 }
//                 section.main h1 {
//                   margin-top: 0;
//                 }
//
//                 .img-thumbnail {
//                     float: left;
//                     padding: 2em 0.5em 0
//                 }
//                 img.thumbnail {
//                     width: 260px;
//                 }
//                 .img-thumbnail .label {
//                   font-size: 0.8125em;
//                   max-width: 260px;
//                   overflow: hidden;
//                   text-overflow: ellipsis;
//                   white-space: nowrap;
//                 }
//                 header .site-id {
//                     font-weight: lighter;
//                     font-size: 1.25rem;
//                     margin-right: 2em;
//                 }
//                 .order-btn {
//                     float: right;
//                     margin-right: 0.5em;
//                     white-space: nowrap;
//                 }
//             </style>
//         </head>
//         <body>
//             <header>
//                 <div class="container">
//                     <span class="site-id">Fotograf Lutz Maier</span>
//                     <nav>
//                         <a href="/">Startseite</a> &middot;
//                         <a href="/galleries">Gallerien</a> &middot;
//                         <a href="/shopping-cart">Warenkorb</a>
//                     </nav>
//                 </div>
//             </header>
//
//             <section class="main">
//                 <div class="container">
//                     {{> (lookup . 'bodyPartial') }}
//                 </div>
//             </section>
//
//             <footer>
//                 <div class="container">
//                     <span class="subtle">&copy; Copyright {{currentYear}}</span>
//                 </div>
//             </footer>
//         </body>
//     </html>`);


// TODO You're probably going to move these partials into the views that are using them
// TODO Some partials may be used by distinct views, thus you might gonna end up with a fragments module that holds these kind of generic HTML snippets
hbs.registerPartial('orderableImgThumb', `
      <div class="img-thumbnail">
          <img class="thumbnail" src="{{imgUri}}">
          <div class="label subtle">{{label}}</div>
          <div>
              <form action="/shopping-cart/add" method="post">
                  <input type="hidden" name="imgId" value="{{imgId}}">
                  <input type="hidden" name="returnUri" value="{{galleryUri}}">
                  <button type="submit" class="order-btn">In der Warenkorb &rarr;</button>
              </form>
          </div>
      </div>`);

hbs.registerPartial('imgThumb', `
      <div class="img-thumbnail">
          <img class="thumbnail" src="{{imgUri}}">
          <div class="label subtle">{{label}}</div>
      </div>`);

hbs.registerPartial('galleryTeaser', `
      <div class="gallery-teaser img-thumbnail">
          <a href="{{galleryUri}}">
              <img class="thumbnail" src="{{galleryThumbUri}}">
              <p>{{name}}</p>
          </a>
      </div>`);

hbs.registerPartial('startPage', `
    <h1>Neueste Gallerien - Fotograf Lutz Maier</h1>
    <div class="clearfix">
    {{#each galleries}}
      {{>galleryTeaser this}}
    {{/each}}
    </div>
    <p><a href="/galleries">Alle Gallerien &rarr;</a></p>`);

hbs.registerPartial('allGalleries', `
    <h1>Alle Gallerien - Fotograf Lutz Maier</h1>
    <div class="clearfix">
    {{#each galleries}}
      {{>galleryTeaser}}
    {{/each}}
    </div>`);

hbs.registerPartial('gallery', `
    <h1>{{gallery.name}}</h1>
    <div class="clearfix">
    {{#each gallery.images}}
      {{>orderableImgThumb galleryUri=../gallery.uri}}
    {{/each}}
    </div>`);

hbs.registerPartial('shoppingCart', `
    <h1>Warenkorb</h1>
    <p>Anzahl Bilder: {{shoppingCart.itemCount}}</p>
    <div class="clearfix">
    {{#each shoppingCart.images}}
      {{>imgThumb}}
    {{/each}}
    </div>`);

hbs.registerPartial('guideUserAfterError', `
    <p><a href="/">Hier</a> kommen Sie zurück zur <a href="/">Startseite</a>. 
    Oder durchstöbern Sie meine <a href="/galleries">Gallerien</a>.</p>`);

hbs.registerPartial('404', `
    <h1>Angeforderte Seite nicht gefunden</h1>
    {{> guideUserAfterError}}`);

hbs.registerPartial('500', `
    <h1>Interner Fehler</h1>
    {{> guideUserAfterError}}`);


app.use(express.static('public'));

// app.get('/', (req, res) => {
//     function generateResponse(galleries) {
//         const now = new Date();
//         const data = {
//             currentYear: now.getFullYear(),
//             bodyPartial: 'startPage',
//             galleries: galleries.slice(0, Math.min(3, galleries.length))
//         };
//         res.send(layout(data));
//     }
//
//     getGalleries(generateResponse);
// });

router(app);

app.get('/galleries', (req, res) => {
    function generateResponse(galleries) {
        const now = new Date();
        const data = {
            currentYear: now.getFullYear(),
            bodyPartial: 'allGalleries',
            galleries: galleries
        };
        res.send(layout(data));
    }

    galleries.getGalleries(generateResponse);
});

// /**
//  * Builds a galleries data structure from filesystem contents
//  * @param doneHandler a function called when reading out galleries has been finished
//  */
// function getGalleries(doneHandler) {
//     const basePath = __dirname + '/public/galleries/';
//     fs.readdir(basePath, 'utf8', function(err, files) {
//         const galleries = [];
//         if (err) {
//             console.log(err);
//         }
//
//         // First let's filter all regular gallery directories
//         const galleryDirNames = files.filter((fileName) => {
//             const subDirPath = basePath + fileName;
//             const stats = fs.statSync(subDirPath);
//             const hasGalleryNamingConvention = /^\d{4}-\d{2}-\d{2}-[a-z0-9]*/i.test(fileName);
//             return stats.isDirectory() && hasGalleryNamingConvention;
//         });
//
//         // Let's generate the list of gallery objects and call the doneHandler
//         // when all callbacks have been executed. This is the difficulty of asynchronicity :(
//         let numCallbacks = galleryDirNames.length;
//         galleryDirNames.forEach(function(galleryDirName) {
//             const subDirPath = basePath + galleryDirName;
//             fs.readdir(subDirPath, function(err, files) {
//                 const imgRex = /\.jpg$|\.jpeg$|\.png$/i;
//                 const allImages = files.filter(fileName => {
//                     return imgRex.test(fileName);
//                 });
//                 const hasImages = allImages.length > 0;
//                 if (hasImages) {
//                     const galleryName = galleryDirName;
//                     const galleryUri = '/galleries/' + galleryName;
//                     const gallery = {
//                         name: galleryName,
//                         galleryUri: galleryUri,
//                         galleryThumbUri: galleryUri + '/' + allImages[0],
//                     };
//                     galleries.push(gallery);
//                 }
//
//                 const isThisTheLastCallback = --numCallbacks === 0;
//                 if (isThisTheLastCallback) {
//                     // Attention: we never know in which order callbacks are called,
//                     // so we have to sort the result
//                     galleries.sort((g1, g2) => {
//                         return g1.name < g2.name;
//                     });
//                     doneHandler(galleries);
//                 }
//             });
//         });
//     });
// }

app.get('/galleries/:galleryKey', (req, res) => {
    const galleryKey = req.params.galleryKey;
    const galleryName = galleryKey;

    const gallery = {
        name: galleryName,
        images: [],
        uri: '/galleries/' + galleryName
    };

    const basePath = __dirname + '/public/galleries/';
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

        // Generate response
        const now = new Date();
        const data = {
            currentYear: now.getFullYear(),
            bodyPartial: 'gallery',
            gallery: gallery
        };
        res.send(layout(data));
    });
});

app.use('/shopping-cart', cookieParser());
app.post('/shopping-cart/add', bodyParser.urlencoded({ extended: true }));
app.post('/shopping-cart/add', (req, res) => {
    const newlyAddedImgId = req.body.imgId;
    const alreadyAddedImages = req.cookies.shoppingCart || [];
    const imageNotYetAdded = !alreadyAddedImages.includes(newlyAddedImgId);
    if (imageNotYetAdded) {
        alreadyAddedImages.push(newlyAddedImgId);
    }
    res.cookie('shoppingCart', alreadyAddedImages, {httpOnly: true});

    const returnUri = req.body.returnUri || '/';
    res.redirect(302, returnUri);
});

app.get('/shopping-cart', (req, res) => {
    const imagesInCart = req.cookies.shoppingCart || [];
    const images = [];
    imagesInCart.forEach(function(image) {
        const label = image.slice(image.lastIndexOf('/') + 1);
        images.push({
            imgUri: '/galleries/' + image,
            label: label
        });
    });

    const now = new Date();
    const data = {
        currentYear: now.getFullYear(),
        bodyPartial: 'shoppingCart',
        shoppingCart: {
            images: images,
            itemCount: imagesInCart.length
        }
    };
    res.send(layout(data));
});

// TODO For error situations I imagine having an errorController or something like that which is responsible to respond with 404, 500 and these sort of things
// Custom 404
app.use((req, res) => {
    const now = new Date();
    const data = {
        currentYear: now.getFullYear(),
        bodyPartial: '404',
    };
    res.status(404).send(layout(data));
});

// Custom 500
app.use((err, req, res) => {
    console.log(`Unhandled error caught: [${err}]`);

    const now = new Date();
    const data = {
        currentYear: now.getFullYear(),
        bodyPartial: '500',
    };
    res.status(500).send(layout(data));
});

app.listen(3000, () => console.log('Photopick listening on port 3000!'));