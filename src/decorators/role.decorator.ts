import { SetMetadata } from '@nestjs/common';

// constants
import { USER_ROLES } from '../constants';

export const ROLE_KEY = 'ROLE';

export const Roles = (...role: USER_ROLES[]) => SetMetadata(ROLE_KEY, role);
