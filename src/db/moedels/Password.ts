import { hashPassword } from "../../utils/hashPassword"
import { IPassword, passwordModel } from "../schemas/password"
import bcrypt from "bcrypt"

export class MongoPasswordModel {
    public passwordModel = passwordModel
    
    public createPassword = async (password: string) => {
        const hashedPassword = await hashPassword(password)

        const newPassword = new this.passwordModel()
        newPassword.password = hashedPassword
        
        newPassword.save().then(() => console.log("make password succ"))
    }

    public comparePassword = async (password: string) => {
        const foundPassword = await this.passwordModel.findPassword()
        const isPasswordCorrect = await bcrypt.compare(password, foundPassword[0].password);

        if (isPasswordCorrect) {
            return true
        } else {
            throw new Error("비밀번호가 일치하지 않습니다.")
        }
    }
}