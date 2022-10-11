import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

/**
 * @param type: 요청이 지켜야 할 클래스 형태의 DTO
 * @parma skipMissingProperties: 옵션을 기본적으로 false 인자의 필요에 따라 true로 변환 true가 되면 누락된 값은 유효성 검사를 하지 않는다.
 */
export const BodyDtoValidatorMiddleware = (type: any, skipMissingProperties = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(type, req.body);
    validateOrReject(dto, { skipMissingProperties })
      .then(() => {
        req.body = dto;
        next();
      })
      .catch((errors: ValidationError[]) => {
        const errorsMessageArray: string[] = [];
        errors.forEach(errors => {
          errorsMessageArray.push(...(Object as any).values(errors.constraints));
        });
        return res.status(400).json({ name: 'ValidationErrorException', message: errorsMessageArray });
      });
  };
};
