import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class MiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    /*
      PUT LOGIC IN THE MIDDLEWARE
    */
    next();
  }
}
