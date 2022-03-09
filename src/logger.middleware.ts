import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as requestIp from 'request-ip';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, path: url } = req;
    const ip = req.clientIp ? req.clientIp : requestIp.getClientIp(req);
    const userAgent = req.get('user-agent') || '';

    res.on('close', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} -  ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
