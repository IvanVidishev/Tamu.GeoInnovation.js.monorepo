import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * NestJS guard used to prevent non-admins from accessing admin routes
 *
 * @export
 * @class AdminRoleGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AdminRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isAuthed = request.isAuthenticated();
    let canProceed = false;
    if (isAuthed) {
      if (request.user.claims) {
        if (request.user.claims.role) {
          const level = request.user.claims.role.level;
          if (level >= ROLE_LEVELS.ADMIN) {
            canProceed = true;
          }
        }
      }
    }
    return canProceed;
  }
}

/**
 * NestJS guard used to prevent users and guests from accessing manager routes
 *
 * @export
 * @class ManagerRoleGuard
 * @implements {CanActivate}
 */
@Injectable()
export class ManagerRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isAuthed = request.isAuthenticated();
    let canProceed = false;
    if (isAuthed) {
      if (request.user.claims) {
        if (request.user.claims.role) {
          const level = request.user.claims.role.level;
          if (level >= ROLE_LEVELS.MANAGER) {
            canProceed = true;
          }
        }
      }
    }
    return canProceed;
  }
}

/**
 * NestJS guard. May not be necessary.
 *
 * @export
 * @class UserRoleGuard
 * @implements {CanActivate}
 */
@Injectable()
export class UserRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isAuthed = request.isAuthenticated();
    let canProceed = false;
    if (isAuthed) {
      if (request.user.claims) {
        if (request.user.claims.role) {
          const level = request.user.claims.role.level;
          if (level >= ROLE_LEVELS.USER) {
            canProceed = true;
          }
        }
      }
    }
    return canProceed;
  }
}
