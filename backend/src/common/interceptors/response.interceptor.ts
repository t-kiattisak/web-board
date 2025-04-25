/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res) => {
        if (
          res &&
          typeof res === 'object' &&
          'data' in res &&
          'message' in res
        ) {
          return {
            success: true,
            data: res.data,
            message: res.message,
          };
        }

        return {
          success: true,
          data: res,
          message: 'OK',
        };
      }),
    );
  }
}
