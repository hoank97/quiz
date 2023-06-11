import { SetMetadata } from '@nestjs/common';
import { ROLE } from '../constants/variables.constants';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);
