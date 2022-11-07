import UserService from '../services/user.service.js';
import jwt from "jsonwebtoken";

class UserController{
    async createUser(req, res) {
        try {
          //debuglog(req);
          const user = await UserService.createUser(req.body);
    
          return res.send(user);
        } catch (error) {
          //debuglog(error);
    
          return res.status(409).send(error.message);
        }
      }

      async login(req, res) {
        try {
          const user = await UserService.findUserByEmail(req.body.email);
          if (user !== null && req.body.password == user.password) {
            const token = jwt.sign(
              { user_id: user._id, email: user.email },
              process.env.SECRET,
              { expiresIn: "2h" }
            );
    
            return res
              .status(200)
              .send({ email: user.email, name: user.name, token });
          }
    
          return res.status(401).send("user or password incorrect");
        } catch (error) {
          //debuglog(error);
    
          return res.status(409).send(error.message);
        }
      }
}

export default new UserController();

