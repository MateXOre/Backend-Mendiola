import express from 'express'
const app = express()
const PORT= 8080
import {productManager} from './managers/index.js'

app.get('/productos', async(require, response)=>{

    const {limit} = require.query

    const Products = await productManager.getProducts()
    response.send({success: true, products: Products})
})

app.listen(PORT, () =>{
    console.log('FUNCA TODO')
})