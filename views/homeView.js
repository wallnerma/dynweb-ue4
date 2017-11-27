const layout = require('./layout');
const startPage = require('../templates/startPage');

function renderView(galleries) {
    // TODO the footer of the website requires the current year to display copyright info,
    // currently the currentYear property is set multiple times. This is a violation of
    // DRY (Don't repeat yourself). Hence, one might wanna consider moving the date / currentYear
    // part into the layout module somehow. You could use Object.assign to "merge" objects easily.
    // No worry, if you're not going to do that, it's not mandatory. I'll going to show how to do it
    // when refactoring this code myself for exercise 5.
    const now = new Date();
    const data = {
        currentYear: now.getFullYear(),
        bodyPartial: 'startPage',
        galleries: galleries.slice(0, Math.min(3, galleries.length))
    };
    return layout(data);
}

module.exports = {
    render: renderView
};