const hbs = require('handlebars');

hbs.registerPartial('orderableImgThumb', `
      <div class="img-thumbnail">
          <img class="thumbnail" src="{{imgUri}}">
          <div class="label subtle">{{label}}</div>
          <div>
              <form action="/shopping-cart/add" method="post">
                  <input type="hidden" name="imgId" value="{{imgId}}">
                  <input type="hidden" name="returnUri" value="{{galleryUri}}">
                  <button type="submit" class="order-btn">In den Warenkorb &rarr;</button>
              </form>
          </div>
      </div>`);

const gallery = hbs.registerPartial('gallery', `
    <h1>{{gallery.name}}</h1>
    <div class="clearfix">
    {{#each gallery.images}}
      {{>orderableImgThumb galleryUri=../gallery.uri}}
    {{/each}}
    </div>`);

module.exports = gallery;