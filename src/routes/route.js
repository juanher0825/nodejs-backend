import UserController from "../controllers/user.controller.js";
import validate from '../middleware/validateSchema.js';
import createUSchema from '../schemas/user.schemas.js';
import ProductController from '../controllers/product.controller.js'

function routes(app){

    //Auth

    app.post("/api/login", UserController.login);

    //User
    app.get("/api/users", UserController.getUsers);
    app.get("/api/user/:identification", UserController.getUserByIdentification);
    app.post("/api/users", validate(createUSchema), UserController.createUser);
    app.put("/api/user/:identification", validate(createUSchema), UserController.updateUser);
    app.delete("/api/user/:identification", UserController.deleteUser);

    //Product
    app.post("/api/products", ProductController.createProduct);
}

export default routes;