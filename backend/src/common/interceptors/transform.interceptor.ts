import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassType<T> {
  new (...args: any[]): T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  constructor(private readonly classType: ClassType<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) =>
        plainToInstance(this.classType, data, {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}
