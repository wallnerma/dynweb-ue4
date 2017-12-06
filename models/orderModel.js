const fs = require('fs');

function saveOrderToFS(firstName, lastName, telNumber) {
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

    let fileName = year.toString() + "-" + month.toString() + "-" + day.toString() + "_" + hour.toString() + "-" + minute.toString() + "-" + seconds.toString() + "_" + firstName + "-" + lastName + '.txt';

    fs.writeFile(orderDir + fileName, "test", 'utf8', (err) => {});


}

module.exports = {
    saveOrder: saveOrderToFS
};