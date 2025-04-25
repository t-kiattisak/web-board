/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/common/interceptors/response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RESPONSE_MODEL_KEY } from '../decorators/response-model.decorator';
import { plainToInstance } from 'class-transformer';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const responseModel = this.reflector.get(
      RESPONSE_MODEL_KEY,
      context.getHandler(),
    );

    return next.handle().pipe(
      map((res) => {
        let data = res;
        let message = 'OK';

        if (
          res &&
          typeof res === 'object' &&
          'data' in res &&
          'message' in res
        ) {
          data = res.data;
          message = res.message;
        }

        const finalData = responseModel
          ? plainToInstance(responseModel, data, {
              excludeExtraneousValues: true,
            })
          : data;

        return {
          success: true,
          data: finalData,
          message,
        };
      }),
    );
  }
}
