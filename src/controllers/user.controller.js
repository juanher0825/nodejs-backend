import UserService from '../services/user.service.js';
import jwt from "jsonwebtoken";
import jwt_decode from 'jwt-decode';

class UserController{
    async createUser(req, res) {
        try {
          //debuglog(req);
          const user = await UserService.createUser(req.body);
          console.log("----------The user is create----------")
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
          console.log("----------The users are list----------")
          return res.send(userExist);
        } catch (error) {
          //debuglog(error);
    
          return res.status(409).send(error.message);
        }
      }

      async updateUser(req, res) {
        try {
          const infoToken = jwt_decode(req.headers.authorization)
          console.log("Email del token logueado: " + infoToken.email);
          const userExist = await UserService.findUserByIdentification(req.params.identification);
    
          if (userExist == null) {
            return res.status(409).send("user does not exists");
          }else if(infoToken.email == userExist.email){
            const user = await UserService.updateUser(req.params.identification, req.body);
            console.log("----------The user " + req.params.identification + " are update----------");
            return res.send(user);
          }else{
            return res.status(409).send("You aren´t login with the account " + userExist.email);
          }
    
          //req.body.password = await bcrypt.hash(req.body.password, 10)
    
          
        } catch (error) {
          //debuglog(error);
          return res.status(409).send(error.message);
        }
      }

      async deleteUser(req, res) {
        

        
          try {
            const infoToken = jwt_decode(req.headers.authorization)
            console.log("Email del token logueado: " + infoToken.email);
            const userExist = await UserService.findUserByIdentification(req.params.identification);
      
            if (userExist == null) {
              return res.status(409).send("user does not exists");
            }else if(infoToken.email == userExist.email){
              let user = await UserService.deleteUser(req.params.identification);
              console.log("----------The user " + req.params.identification + " are delete----------");
              return res.send(user);
            }else{
              return res.status(409).send("You aren´t login with the account " + userExist.email);
            }
      
           
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
              { user_id: user._id, email: user.email, identification: user.identification },
              process.env.SECRET,
              { expiresIn: "2h" }
            );
    
            return res
              .status(200)
              .send({ email: user.email, name: user.name, identification: user.identification, token });
          }
    
          return res.status(401).send("user or password incorrect");
        } catch (error) {
          //debuglog(error);
    
          return res.status(409).send(error.message);
        }
      }
}

export default new UserController();

