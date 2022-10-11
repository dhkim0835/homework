import { AppError } from "./../exception/appError";
import { IList } from "../db/schemas/list";

import * as listModel from "../db/moedels/List"
import * as passwordModel from "../db/moedels/Password"


const createList = async (listInfo: IList): Promise<IList> => {
  const newList = await listModel.createList(listInfo);
  return newList;
};

const getAllList = async (): Promise<IList[]> => {
  const lists = await listModel.getAllList();

  return lists;
};

const getListWithPagenation = async (page, perPage) => {
  const pagenatedList = await listModel.getListWithPagenation(page, perPage);

  return pagenatedList;
};

const updateIsSuccess = async (id: string): Promise<IList | null> => {
  const updatedIsSuccess = await listModel.updateIsSuccess(id);

  return updatedIsSuccess;
};

const deleteList = async (id: string, password?: string): Promise<IList | null> => {
  if (typeof password === "string") {
    const isPassword = await passwordModel.comparePassword(password);
    if (isPassword === true) {
      const deletedList = await listModel.deleteList(id);

      return deletedList;
    } else {
      let error: AppError = new AppError(400, `비밀번호가 일치하지 않습니다.`);

      throw error;
    }
  } else {
    const deletedList = await listModel.deleteList(id);

    return deletedList;
  }
};


export { createList, getAllList, getListWithPagenation, updateIsSuccess, deleteList }