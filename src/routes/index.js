import UserController from "../controllers/user.controller.js";

function routes(app){
    app.post("/api/users", UserController.createUser);
}

export default routes;