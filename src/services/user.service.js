import User from '../model/user.model.js'

class UserService{
    async createUser(input) {
        try {
            const user = await User.create(input)
            return user.toJSON()
        } catch (error) {
            throw new Error(error)
        }
    }

    async findUserByEmail(email) {
        try {
            const user = await User.findOne({email: email})
            return user
        }catch (error) {
            throw new Error(error)
        }
    }
}

export default new UserService()