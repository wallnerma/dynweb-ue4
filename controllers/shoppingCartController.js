const shoppingCartView = require('../views/shoppingCartView');

function handleGetShoppingCart(req, res) {
    const imagesInCart = req.cookies.shoppingCart || [];
    const images = [];
    imagesInCart.forEach(function(image) {
        const label = image.slice(image.lastIndexOf('/') + 1);
        images.push({
            imgUri: '/galleries/' + image,
            label: label
        });
    });
    res.send(shoppingCartView.render(images, imagesInCart));
}

function handlePostShoppingCart(req, res) {
    const newlyAddedImgId = req.body.imgId;
    const alreadyAddedImages = req.cookies.shoppingCart || [];
    const imageNotYetAdded = !alreadyAddedImages.includes(newlyAddedImgId);
    if (imageNotYetAdded) {
        alreadyAddedImages.push(newlyAddedImgId);
    }
    res.cookie('shoppingCart', alreadyAddedImages, {httpOnly: true});

    const returnUri = req.body.returnUri || '/';
    res.redirect(302, returnUri);
}

module.exports = {
    getShoppingCart: handleGetShoppingCart,
    postShoppingCart: handlePostShoppingCart
};