const fs = require('fs');
const path = require('path');

//Lectura de acchivos
let productsJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/products.json'), 'utf-8'));

let controller = {

    //Crear producto
    createProductoView : (req, res, next) => {
        res.render('productAdd');
    },
    storeProducto : (req, res, next) => {
        //Pido los datos del form
        let productoCreado = req.body;

        //Agrego el producto al array
        productsJson.push(productoCreado);

        //Escribo en el JSON
        fs.writeFileSync(__dirname + '/../database/products.json', JSON.stringify(productsJson));
        res.send('producto creado');
    },



    editProductoView : (req, res, next) => {
        let idUrl = req.params.id;

        let productoEncontrado = productsJson.find(producto => producto.id == idUrl);

        productoEncontrado ? res.render('productEdit', {producto : productoEncontrado}) : res.send('El producto no existe');
    },
    updateProducto : (req, res, next) => {
        let productoModificado = req.body;

        let productosActualizados = productsJson.map(function(producto) {
            if (producto.id == req.params.id) {
                producto = productoModificado;
            }
            return producto;
        });

        fs.writeFileSync(__dirname + '/../database/products.json', JSON.stringify(productosActualizados));
        res.render('productEdit', { producto : productoModificado });
    },




    deleteProducto : (req, res, next) => {
        let idUrl = req.params.id;
        let productoExistente = productsJson.find(producto => producto.id == idUrl);

        if (productoExistente) {
            let productoEliminado = productsJson.filter(producto => producto.id != idUrl);

            fs.writeFileSync(__dirname + '/../database/products.json', JSON.stringify(productoEliminado));
            return res.send('producto eliminado');
        
        } else {

            return res.send('El producto a eliminar no existe');
        }       
    },




    productList : (req, res, next) => {
        res.render('productList', {productos : productsJson});
    }
}

module.exports = controller;