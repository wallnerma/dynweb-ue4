const shoppingCartView = require('../views/shoppingCartView');
const orderSuccessView = require('../views/orderSuccessView');
const orderModel = require('../models/orderModel');

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

function handlePostOrderSuccess(req, res) {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const telNumber = req.body.phonenumber;
    console.log(firstName + lastName + telNumber);

    const imagesInCart = req.cookies.shoppingCart || [];
    const images = [];
    imagesInCart.forEach(function(image) {
        const label = image.slice(image.lastIndexOf('/') + 1);
        images.push({
            imgUri: '/galleries/' + image,
            label: label
        });
    });

    orderModel.saveOrder(firstName, lastName, telNumber, imagesInCart);
    res.send(orderSuccessView.renderView());
}

module.exports = {
    getShoppingCart: handleGetShoppingCart,
    postShoppingCart: handlePostShoppingCart,
    postOrderSuccess: handlePostOrderSuccess
};