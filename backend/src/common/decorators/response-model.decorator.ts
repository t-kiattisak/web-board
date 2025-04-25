import { SetMetadata } from '@nestjs/common';

export const RESPONSE_MODEL_KEY = 'response_model';
export const ResponseModel = (model: any) =>
  SetMetadata(RESPONSE_MODEL_KEY, model);
