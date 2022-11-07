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

    async getUsers() {
        try {
            const users = await User.find({})
            return users
        }catch (error) {
            throw new Error(error)
        }
    }

    async updateUser(identification, input) {
        try {
            const user = await User.findOneAndUpdate({identification:identification}, input, {new: true})
            return user?.toJSON()
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteUser(identification) {
        try {
            const user = await User.deleteOne({identification: identification})
            return user
        }catch (error) {
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

    async findUserByIdentification(identification) {
        try {
            const user = await User.findOne({identification: identification})
            return user
        }catch (error) {
            throw new Error(error)
        }
    }
}

export default new UserService()