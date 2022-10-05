import { userModel} from "../schemas/user";


export class MongoUserModel {
    private userModel = userModel

    private createList = async (listInfo) => {
        const newList = await this.userModel.create(listInfo)

        return newList
    }
}