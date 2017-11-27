const hbs = require("handlebars");

const startPage = hbs.registerPartial('startPage', `
    <h1>Neueste Gallerien - Fotograf Lutz Maier</h1>
    <div class="clearfix">
    {{#each galleries}}
      {{>galleryTeaser this}}
    {{/each}}
    </div>
    <p><a href="/galleries">Alle Gallerien &rarr;</a></p>`);

module.exports = startPage;