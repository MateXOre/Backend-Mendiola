const fs= require('fs')
const direccion='Prods.json'
class ProductManager {
    constructor(){
        this.products=[]
    }
    getProducts=()=>{
        console.log(this.products)
    }

    getNextCode=()=> {
        const count=this.products.length
        if(count==0) return 1

        const lastProduct= this.products[count-1]
        const lastCode= lastProduct.code
        const nextCode= lastCode + 1 
        return nextCode
    }
    
    addProducts=(title, description, price, thumbnail, stock)=>{
        const code = this.getNextCode()

        const product={
            code,
            title,
            description,
            price,
            thumbnail,
            stock
        }
        this.products.push(product)
        if(fs.existsSync(direccion)){
            fs.promises.appendFile(direccion, ',')
            let jsonStr=JSON.stringify(product)
            fs.promises.appendFile(direccion, jsonStr)
            .then(()=>{
                console.log('Producto guardado')
            })
            .catch(e=>{
                console.error('No se pudo guardar el producto',e)
            })

        } else {
            fs.promises.writeFile(direccion, '[')
            let jsonStr=JSON.stringify(product)
            fs.promises.appendFile(direccion, jsonStr)
                .then(()=>{
                    console.log('Producto guardado')
                })
                .catch(e=>{
                    console.error('No se pudo guardar el producto',e)
                })
            fs.promises.appendFile(direccion, ']')

        }




    }
    getProductById=(id)=>{
        const prod= this.products.find(prod=>prod.code==id)
        if (prod == undefined) {
            console.log('Not found')
        } else {
            console.log(this.products[id-1])
        }
    }
}


const manager= new ProductManager()


