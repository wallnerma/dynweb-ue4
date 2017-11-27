const hbs = require('handlebars');

const galleryTeaser = hbs.registerPartial('galleryTeaser', `
      <div class="gallery-teaser img-thumbnail">
          <a href="{{galleryUri}}">
              <img class="thumbnail" src="{{galleryThumbUri}}">
              <p>{{name}}</p>
          </a>
      </div>`);

module.exports = galleryTeaser;