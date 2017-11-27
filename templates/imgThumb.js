const hbs = require('handlebars');

const imgThumb = hbs.registerPartial('imgThumb', `
      <div class="img-thumbnail">
          <img class="thumbnail" src="{{imgUri}}">
          <div class="label subtle">{{label}}</div>
      </div>`);

module.exports = imgThumb;