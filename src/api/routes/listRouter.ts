import { Router } from "express"

import { NextFunction, Request, Response } from "express";

import { IList } from "../../db/schemas/list";
import { responseFormagger } from "../../utils/responseFormmater";

import config from "../../configs";

import * as listService from "../../services/listService"

const listRouter = Router()

listRouter.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { description } = req.body;
    const newListInfo: IList = {
      description,
    };
    const newList = await listService.createList(newListInfo);

    responseFormagger(req, newList, 201);
    return next();
  } catch (error) {
    next(error);
  }
});

listRouter.get("/",  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lists = await listService.getAllList();
    if (process.env.NODE_ENV === "production") {
      responseFormagger(req, lists, 200);

      return next();
    } else {
      const userInfo = { name: config.NAME, birth: config.BIRTH };
      responseFormagger(req, { lists, userInfo }, 200);

      return next();
    }
  } catch (error) {
    next(error);
  }
});

listRouter.get("/pagenate", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = Number(req.query.page || 1); // 값이 없다면 기본값으로 1 사용
    const perPage = Number(req.query.perPage || 10);

    const pagenatedList = await listService.getListWithPagenation(page, perPage);

    responseFormagger(req, pagenatedList, 200);

    return next();
  } catch (error) {
    next(error);
  }
});

listRouter.patch("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const udpatedIsSuccess = await listService.updateIsSuccess(id);

    responseFormagger(req, { isSuccess: udpatedIsSuccess?.isSuccess }, 200);

    return next();
  } catch (error) {
    next(error);
  }
});

listRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (process.env.NODE_ENV === "production") {
      const id = req.params.id;
      const password = req.body.password;
      const deletedList = await listService.deleteList(id, password);

      responseFormagger(req, `${deletedList?.description}이(가) 삭제되었습니다.`, 200);

      return next();
    } else {
      const id = req.params.id;
      const deletedList = await listService.deleteList(id);

      responseFormagger(req, `${deletedList?.description}이(가) 삭제되었습니다.`, 200);

      return next();
    }
  } catch (error) {
    next(error);
  }
});

export { listRouter }
