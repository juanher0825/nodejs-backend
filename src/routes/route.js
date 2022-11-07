import UserController from "../controllers/user.controller.js";
import validate from '../middleware/validateSchema.js';
import createUSchema from '../schemas/user.schemas.js';

function routes(app){

    //Auth

    app.post("/api/login", UserController.login);

    //User
    app.post("/api/users", validate(createUSchema), UserController.createUser);
}

export default routes;