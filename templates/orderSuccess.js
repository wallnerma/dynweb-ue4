const hbs = require('handlebars');

const orderSuccess = hbs.registerPartial('orderSuccess', `
    <h3>Vielen Dank für Ihre Bestellung</h3>
    <p>Ihre Bestellung wird so schnell wie möglich bearbeitet.</p>
    <p><a href="/">Hier</a> kommen Sie zurück zur <a href="/">Startseite</a>.</p>`);

module.exports = orderSuccess;