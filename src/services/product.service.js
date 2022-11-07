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
}

export default new ProductService()