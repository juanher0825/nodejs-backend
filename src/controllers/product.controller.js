import ProductService from "../services/product.service.js";
import UserService from "../services/user.service.js";

class ProductController{
    async createProduct(req, res) {
          try {
            const userid = req.body.owner.identification;
            console.log(req.body.owner.identification);
            const userExist = await UserService.findUserByIdentification(userid);
            console.log(userExist);
      
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
}

export default new ProductController();