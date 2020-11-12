let express = require('express');
let router = express.Router();

//Controlador
let productosController = require('../controllers/productosController');

//Router
router.get('/', productosController.home);

router.get('/productAdd', productosController.createProductoView);
router.post('/productAdd', productosController.storeProducto);

router.get('/productEdit/:id', productosController.editProductoView);
router.post('/productEdit/:id', productosController.updateProducto);

router.get('/productDelete/:id', productosController.deleteProducto);

router.get('/productList', productosController.productList);

module.exports = router;