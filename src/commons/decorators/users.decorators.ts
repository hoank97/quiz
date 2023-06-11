import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export enum KEYS {
  USER = 'users',
  TOKEN = 'token',
}
export const User = createParamDecorator((data: KEYS, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { headers } = request;

  return headers[data];
});
