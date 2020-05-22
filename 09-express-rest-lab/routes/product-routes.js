var express = require('express');
var router = express.Router();

let nextId = 1;
initialProducts = [{
    id: 1,
    name: 'JavaScript The Good Parts', 
    description: 'Classical JavaScript book by Douglas Crockford',
    price: 25.5,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX381_BO1,204,203,200_.jpg'
}];

const products = new Map();
initialProducts.forEach(prod => {
    products.set(prod.id, prod);
});

router.get('/', (req, res) => {
    res.json(Array.from(products.values()));
});

router.get('/:productId', (req, res) => {
    const id = +req.params.productId;
    const product = products.get(id);
    if(!product) {
        sendErrorResponse(req, res, 404, `Product with ID=${id} does not exist`);
    }
    res.json(product);
});

router.post('/', (req, res) => {
    product = req.body;
    product.id = ++nextId;
    products.set(product.id, product);
    res.status(201);
    res.location(`/api/products/${product.id}`)
    res.json(product);
});

router.put('/:productId', (req, res) => {
    const id = +req.params.productId;
    const newProduct = req.body;
    if(newProduct.id !== id) {
        sendErrorResponse(req, res, 400, `Product ID=${id} from URL is different from body ID=${newProduct.id}`);
        return;
    }
    oldProduct = products.get(id);
    if(!oldProduct) {
        sendErrorResponse(req, res, 404, `Product with ID=${id} does not exist`);
        return;
    }
    products.set(id, newProduct);
    res.json(newProduct);
});

router.delete('/:productId', (req, res) => {
    const id = +req.params.productId;
    const oldProduct = products.get(id);
    if(!product) {
        sendErrorResponse(req, res, 404, `Product with ID=${id} does not exist`);
        return;
    }
    products.delete(id);
    res.json(oldProduct);
});

module.exports = router;