import debug from "debug";
import UserService from '../services/user.service.js';

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
}

export default new UserController();

