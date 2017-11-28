const hbs = require('handlebars');

hbs.registerPartial('guideUserAfterError', `
    <p><a href="/">Hier</a> kommen Sie zurück zur <a href="/">Startseite</a>. 
    Oder durchstöbern Sie meine <a href="/galleries">Gallerien</a>.</p>`);

const error404 = hbs.registerPartial('404', `
    <h1>Angeforderte Seite nicht gefunden</h1>
    {{> guideUserAfterError}}`);

const error500 = hbs.registerPartial('500', `
    <h1>Interner Fehler</h1>
    {{> guideUserAfterError}}`);

module.exports = {
    error404: error404,
    error500: error500
};