import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IRequestAuth } from '../types/request.type';
import { USER_ROLE } from '../constants';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<IRequestAuth>();
    return request.user.role === USER_ROLE.ADMIN;
  }
}
