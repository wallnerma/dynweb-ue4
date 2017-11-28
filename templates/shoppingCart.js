const hbs = require('handlebars');

const shoppingCart = hbs.registerPartial('shoppingCart', `
    <h1>Warenkorb</h1>
    <p>Anzahl Bilder: {{shoppingCart.itemCount}}</p>
    <div class="clearfix">
    {{#each shoppingCart.images}}
      {{>imgThumb}}
    {{/each}}
    </div>
    <form action="/shopping-cart/order" method="post">
         <p><label>Vorname: <input type="text" name="firstname" required></label></p>     
         <p><label>Nachname: <input type="text" name="lastname" required></label></p> 
          <p><label>Telefonnummer: <input type="text" name="phonenumber"></label></p>   
         <p><button type="submit">Absenden</button></p>     
     </form>
`);

hbs.registerPartial('imgThumb', `
      <div class="img-thumbnail">
          <img class="thumbnail" src="{{imgUri}}">
          <div class="label subtle">{{label}}</div>
      </div>`);

module.exports = shoppingCart;