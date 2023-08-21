import { NextFunction, Request, Response } from 'express';
import AppError from '../common/app-Error';

export const errorResponder = (error: AppError, request: Request  , response: Response, next: NextFunction) => {

  response.header("Content-Type", 'application/json')
  const status = error.statusCode || 400
  response.status(status).send({error: error.message})
}
