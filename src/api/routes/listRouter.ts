import { NextFunction, Request, Response, Router } from "express";
import { IList } from "../../db/schemas/list";
import { responseFormagger } from "../../utils/responseFormmater";

import config from "../../configs";

// userid를 전달하기 위해 Request user 프로퍼티 추가
declare global {
  namespace Express {
    interface Request {
      responseObject?: any;
      statusCode?: number;
    }
  }
}

export interface IService {
  createList: (listInfo: IList) => Promise<IList>;
  getAllList: () => Promise<IList[]>;
  updateIsSuccess: (id: string) => Promise<IList | null>;
  deleteList: (id: string, password?: string) => Promise<IList | null>;
  getListWithPagenation: (perPage: number, page: number) => Promise<any>;
}
export class ListRouter {
  private service: IService;
  public listRouter;

  constructor(service) {
    this.service = service;
    this.listRouter = Router();
    this.routes();
  }

  private createList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { description } = req.body;
      const newListInfo: IList = {
        description,
      };
      const newList = await this.service.createList(newListInfo);

      responseFormagger(req, newList, 201);
      return next();
    } catch (error) {
      next(error);
    }
  };

  private getAllList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const lists = await this.service.getAllList();
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
  };

  private getListWithPagenation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page || 1); // 값이 없다면 기본값으로 1 사용
      const perPage = Number(req.query.perPage || 10);

      const pagenatedList = await this.service.getListWithPagenation(page, perPage);

      responseFormagger(req, pagenatedList, 200);

      return next();
    } catch (error) {
      next(error);
    }
  };

  private updateIsSuccess = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const udpatedIsSuccess = await this.service.updateIsSuccess(id);

      responseFormagger(req, { isSuccess: udpatedIsSuccess?.isSuccess }, 200);

      return next();
    } catch (error) {
      next(error);
    }
  };

  private deleteList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (process.env.NODE_ENV === "production") {
        const id = req.params.id;
        const password = req.body.password;
        const deletedList = await this.service.deleteList(id, password);

        responseFormagger(req, `${deletedList?.description}이(가) 삭제되었습니다.`, 200);

        return next();
      } else {
        const id = req.params.id;
        const deletedList = await this.service.deleteList(id);

        responseFormagger(req, `${deletedList?.description}이(가) 삭제되었습니다.`, 200);

        return next();
      }
    } catch (error) {
      next(error);
    }
  };

  private routes() {
    this.listRouter.post("/", this.createList);
    this.listRouter.get("/pagenate", this.getListWithPagenation);
    this.listRouter.get("/", this.getAllList);
    this.listRouter.patch("/:id", this.updateIsSuccess);
    this.listRouter.delete("/:id", this.deleteList);
  }
}
