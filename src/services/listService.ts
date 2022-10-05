export class ListService {
    private model
    constructor(model) {
        this.model = model
    }

    private createList = async (listInfo) => {
        const newList = await this.model.createList(listInfo)

        return newList
    }
}