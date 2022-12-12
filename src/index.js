import express from 'express';
import {productManager} from './managers/index.js';
const app = express();
const PORT= 8080;

app.get('/products', async(require, response)=>{
try {
    const {limit} = require.query

    const Products = await productManager.getProducts()

    if (!limit || limit < 1){
        return response.send({success: true, products: Products})
    }

    const productos = Products.slice(0, limit);
    response.send({success: true, productos});
    
} catch (error) {
    console.log(error);

    response.send({success:false, error:"Error"});
}
});
app.get('/products/:id', async(require, response)=>{
    try {
        const {id:paramId}= require.params;
        const id = Number(paramId)
        if(id < 0){
            return response.send({success: false, error: "Numero de id invalido"})
        }

        const product = await productManager.getProductById(id);

        if (!product) {
            return response.send({success:false, error: "No se encuentra el producto"})
        }

        response.send({success: true, product});
        
    } catch (error) {
        console.log(error);
        response.send({success: false, error: "Ocurrio un error"})
    }
})


app.listen(PORT, () =>{
    console.log('FUNCA TODO')
})