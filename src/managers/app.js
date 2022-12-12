import fs from "fs";
const direccion='Prods.json'
export class ProductManager {
    constructor(path){
        this.path=path;
        this.init();
    }

    init() {
        try {
            const existFile= fs.existsSync(this.path);

            if (existFile) return;
            fs.writeFileSync(this.path, JSON.stringify([]));
        } catch (error) {
            console.log(error);
        }

    }
    async getProducts(){
        console.log(this.products)
        const response = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(response)
    }

    async getProductById(id){
        const products = await this.getProducts();

        const productFound = products.find((product) => product.id === id);

        return productFound;
    }

    getNextid=()=> {
        const count=this.products.length
        if(count==0) return 1

        const lastProduct= this.products[count-1]
        const lastid= lastProduct.id
        const nextid= lastid + 1 
        return nextid
    }
    
    addProducts=(title, description, price, thumbnail, stock)=>{
        const id = this.getNextid()

        const product={
            id,
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
}


const manager= new ProductManager()


