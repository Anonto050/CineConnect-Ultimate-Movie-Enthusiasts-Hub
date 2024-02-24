const express = require('express');
const marketplaceController = require('../controllers/marketplaceController');

const router = express.Router();

// Route for fetching all tags for a marketplace
router.get('/tags', marketplaceController.getAllTags); // **//
/* 
    Usage:
    /v1/marketplace/tags?limit=10&offset=0
    /v1/marketplace/tags?limit=10
    /v1/marketplace/tags?offset=0
    /v1/marketplace/tags

    Returns an array of strings (tags) as response
    ['tag1', 'tag2', 'tag3']
*/

// Route for fetching all products for movies, tags, etc.
router.get('/products', marketplaceController.getAllProducts); // **//
/* 
Usage: 
    /v1/marketplace/products?tags=cover,art&movies=Interstellar,godfather&limit=10&offset=0&sortType=name_asc
    /v1/marketplace/products?tags=art
    /v1/marketplace/products?movies=Interstellar
    /v1/marketplace/products?limit=10&offset=0
    /v1/marketplace/products?sortType=name_asc
    /v1/marketplace/products

    sortTypes: name_asc, name_desc, price_asc, price_desc, rating_asc, rating_desc

    See the response format in the snippet from marketplaceController.getAllProducts
*/

// Route for fetching product rating
router.get('/product/:id/rating', marketplaceController.getProductRating); // **//
/*
    See the response format in the snippet from marketplaceController.getProductRating
*/

// Route for fetching product details
router.get('/product/:id', marketplaceController.getProductDetails); // **//
/*
    See the response format in the snippet from marketplaceController.getProductDetails
*/

// Route for fetching product features
router.get('/product/:id/features', marketplaceController.getProductFeatures); // **//
/*
    Returns response as an array of product features
    ['feature1', 'feature2', 'feature3']
*/

// Route for fetchign product tags
router.get('/product/:id/tags', marketplaceController.getProductTags); // **//
/*
    Returns an array of strings (tags) as response
    ['tag1', 'tag2', 'tag3']
*/

// Route to check if user added the product to wishlist
router.get(
    '/product/:id/wishlist',
    marketplaceController.checkProductInWishlist
); // **//
/*
    Response format:
    {
        inWishlist: true/false
    }
*/

// Route to add product to wishlist
router.post('/product/:id/wishlist', marketplaceController.addToWishlist); // **//

// Route to remove product from wishlist
router.delete(
    '/product/:id/wishlist',
    marketplaceController.removeFromWishlist
); // **//

// Route to fetch images for a product (paginated)
router.get('/product/:id/images', marketplaceController.getProductImages); // **//
/*
    Usage:
    /v1/marketplace/product/:id/images?limit=10&offset=0
    /v1/marketplace/product/:id/images?limit=10
    /v1/marketplace/product/:id/images?offset=0
    /v1/marketplace/product/:id/images

    default limit = 5, default offset = 0

    Returns an array of objects as response
    See the response format in the snippet from marketplaceController.getProductImages
*/

module.exports = router;