import UserService from '../services/user.service.js';
import jwt from "jsonwebtoken";

class UserController{
    async createUser(req, res) {
        try {
          //debuglog(req);
          const user = await UserService.createUser(req.body);
          console.log("The user is create")
          return res.send(user);
        } catch (error) {
          //debuglog(error);
    
          return res.status(409).send(error.message);
        }
      }

      async getUsers(req, res) {
        try {
          const userExist = await UserService.getUsers();
    
          if (userExist == null) {
            return res.status(409).send("No current users");
          }
          console.log("The users are list")
          return res.send(userExist);
        } catch (error) {
          //debuglog(error);
    
          return res.status(409).send(error.message);
        }
      }

      async getUserByIdentification(req, res) {
        try {
          const userExist = await UserService.findUserByIdentification(req.params.identification);
    
          if (userExist == null) {
            return res.status(409).send("user does not exists");
          }
  
          return res.send(userExist);
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

