const fs = require('fs');

function saveOrderToFS(firstName, lastName, telNumber, imagesInCard) {
    const orderDir = process.cwd() + "/Bestellungen/";
    if (!fs.existsSync(orderDir)) {
        fs.mkdirSync(orderDir);
    }
    let date = new Date();
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();
    let hour = date.getUTCHours() + 1;
    let minute = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();

    let dateString = year.toString() + "-" + month.toString() + "-" + day.toString();
    let timeString = hour.toString() + "-" + minute.toString() + "-" + seconds.toString();
    let nameString = firstName + "-" + lastName;

    let fileName =  dateString + "_" + timeString + "_" + nameString + '.txt';

    let inhalt = `
    -------------------------------------------------
    Vorname:        ${firstName}
    Nachname:       ${lastName}
    Telefonnummer:  ${telNumber}
    -------------------------------------------------
    Bestell-Datum:  ${dateString}
    -------------------------------------------------
    Bestellung:
    ===========
    ${imagesInCard}
    
    `;

    fs.writeFile(orderDir + fileName, inhalt, 'utf8', (err) => {});


}

module.exports = {
    saveOrder: saveOrderToFS
};