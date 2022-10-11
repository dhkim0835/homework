import { IList, listModel } from '../schemas/list';

const createList = async (listInfo: IList): Promise<IList> => {
  const newList = new listModel(listInfo);
  newList.save().then(() => console.log('make list succ'));

  return newList;
};

const getAllList = async (): Promise<IList[]> => {
  const lists = await listModel.find();

  return lists;
};

const getListWithPagenation = async (page: number, perPage: number) => {
  const total = await listModel.countDocuments();
  const lists = await listModel.getListWithPagenation(page, perPage);

  const totalPage = Math.ceil(total / perPage);

  return { lists, totalPage };
};

const updateIsSuccess = async (id: string): Promise<IList | null> => {
  const foundList = await listModel.findListById(id);
  if (!foundList) {
    throw new Error('해당 리스트가 없습니다.');
  } else if (foundList.isSuccess === true) {
    const updatedIsSuccess = await listModel.findByIdAndUpdate(id, { isSuccess: false }, { new: true });
    return updatedIsSuccess;
  } else {
    const updatedIsSuccess = await listModel.findByIdAndUpdate(id, { isSuccess: true }, { new: true });
    return updatedIsSuccess;
  }
};

const deleteList = async (id: string): Promise<IList | null> => {
  const foundList = await listModel.findListById(id);
  if (!foundList) {
    throw new Error('해당 리스트가 없습니다.');
  }

  const deletedList = await listModel.findByIdAndDelete(id);

  return deletedList;
};

export { createList, getAllList, getListWithPagenation, updateIsSuccess, deleteList };
