import UserController from "../controllers/user.controller.js";
import validate from '../middleware/validateSchema.js';
import createUSchema from '../schemas/user.schemas.js';

function routes(app){
    app.post("/api/users", validate(createUSchema), UserController.createUser);
}

export default routes;