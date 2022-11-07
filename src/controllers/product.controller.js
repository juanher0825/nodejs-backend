import ProductService from "../services/product.service.js";
import UserService from "../services/user.service.js";

class ProductController{
    async createProduct(req, res) {
          try {
            const userid = req.body.owner.identification;
            //console.log(req.body.owner.identification);
            const userExist = await UserService.findUserByIdentification(userid);
            //console.log(userExist);
      
            if (userExist == null) {
              return res.status(409).send("user does not exists");
            }
            req.body.owner = userExist;
            const product = await ProductService.createProduct(req.body);
            console.log("----------The product is create----------")
            return res.send(product);
          } catch (error) {
            //debuglog(error);
            return res.status(409).send(error.message);
          }

          
      }

      async getProducts(req, res) {
        try {
          const productExist = await ProductService.getProducts();
    
          if (productExist == null) {
            return res.status(409).send("No current products");
          }
          console.log("----------The products are list----------")
          return res.send(productExist);
        } catch (error) {
          //debuglog(error);
    
          return res.status(409).send(error.message);
        }
      }

      async getProductByOwner(req, res) {
        try {
        const userExist = await UserService.findUserByIdentification(req.params.identification);
            if (userExist == null) {
            return res.status(409).send("user does not exist");
          }
          const productExist = await ProductService.findProductByOwner(userExist);
    
          if (productExist == null) {
            return res.status(409).send("product does not exists");
          }
  
          return res.send(productExist);
        } catch (error) {
          //debuglog(error);
    
          return res.status(409).send(error.message);
        }
      }

      async getProductByName(req, res) {
        try {
          const productExist = await ProductService.findProductByName(req.params.name);
    
          if (productExist == null) {
            return res.status(409).send("product does not exists");
          }
  
          return res.send(productExist);
        } catch (error) {
          //debuglog(error);
    
          return res.status(409).send(error.message);
        }
      }

      async updateProduct(req, res) {
        try {
          const productExist = await ProductService.findProductByName(req.params.name);
    
          if (productExist == null) {
            return res.status(409).send("product does not exists");
          }
    
          //req.body.password = await bcrypt.hash(req.body.password, 10)
    
          const product = await ProductService.updateProduct(req.params.name, req.body);
          console.log("----------The product " + req.params.name + " are update----------");
          return res.send(product);
        } catch (error) {
          //debuglog(error);
          return res.status(409).send(error.message);
        }
      }

      async deleteProduct(req, res) {
        try {
          const deleteProduct = await ProductService.findProductByName(req.params.name);
    
          if (deleteProduct == null) {
            return res.status(409).send("product does not exists");
          }
    
          let product = await ProductService.deleteProduct(req.params.name);
          console.log("----------The product " + req.params.name + " are delete----------");
          return res.send(product);
        } catch (error) {
          //debuglog(error);
    
          return res.status(409).send(error.message);
        }
      }

      
}

export default new ProductController();