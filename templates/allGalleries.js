const hbs = require('handlebars');
require('./galleryTeaser');

const allGalleries = hbs.registerPartial('allGalleries', `
    <h1>Alle Gallerien - Fotograf Lutz Maier</h1>
    <div class="clearfix">
    {{#each galleries}}
      {{>galleryTeaser}}
    {{/each}}
    </div>`);

module.exports = allGalleries;