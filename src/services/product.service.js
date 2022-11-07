import Product from "../model/product.model.js";

class ProductService{
    async createProduct(input) {
        try {
            const product = await Product.create(input)
            return product.toJSON()
        } catch (error) {
            throw new Error(error)
        }
    }

    async getProducts() {
        try {
            const products = await Product.find({})
            return products
        }catch (error) {
            throw new Error(error)
        }
    }

    async findProductByOwner(owner) {
        try {
            const product = await Product.findOne({owner: owner})
            return product
        }catch (error) {
            throw new Error(error)
        }
    }

    async findProductByName(name) {
        try {
            const product = await Product.findOne({name: name})
            return product
        }catch (error) {
            throw new Error(error)
        }
    }

    
    async updateProduct(name, input) {
        try {
            const product = await Product.findOneAndUpdate({name:name}, input, {new: true})
            return product?.toJSON()
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteProduct(name) {
        try {
            const product = await Product.deleteOne({name: name})
            return product
        }catch (error) {
            throw new Error(error)
        }
    }
}

export default new ProductService()