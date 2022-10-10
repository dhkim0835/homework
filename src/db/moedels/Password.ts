import { hashPassword } from "../../utils/hashPassword";
import { IPassword, passwordModel } from "../schemas/password";
import { IPasswordModel } from "../../services/listService";

import bcrypt from "bcrypt";
import { AppError } from "../../exception/appError";

export class MongoPasswordModel implements IPasswordModel {
  public passwordModel = passwordModel;

  public createPassword = async (password: string): Promise<IPassword> => {
    const hashedPassword = await hashPassword(password);

    const newPassword = new this.passwordModel();
    newPassword.password = hashedPassword;

    newPassword.save().then(() => console.log("make password succ"));

    return newPassword;
  };

  public comparePassword = async (password: string): Promise<boolean> => {
    const foundPassword = await this.passwordModel.findPassword();
    const isPasswordCorrect = await bcrypt.compare(password, foundPassword[0].password);

    if (isPasswordCorrect) {
      return true;
    } else {
      let error: AppError = new AppError(400, `비밀번호가 일치하지 않습니다.`);

      throw error;
    }
  };
}
