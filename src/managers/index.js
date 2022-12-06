import {ProductManagerFilesystem} from './app.js'

const productManager = new ProductManagerFilesystem('./products.json')

export {productManager}