const hbs = require('handlebars');

const shoppingCart = hbs.registerPartial('shoppingCart', `
    <h1>Warenkorb</h1>
    <p>Anzahl Bilder: {{shoppingCart.itemCount}}</p>
    <div class="clearfix">
    {{#each shoppingCart.images}}
      {{>imgThumb}}
    {{/each}}
    </div>`);

hbs.registerPartial('imgThumb', `
      <div class="img-thumbnail">
          <img class="thumbnail" src="{{imgUri}}">
          <div class="label subtle">{{label}}</div>
      </div>`);

module.exports = shoppingCart;