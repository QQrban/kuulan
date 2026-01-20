import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const user = req.user;

    if (!user) {
      throw new ForbiddenException({ message: 'User not found in request' });
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException({ message: 'Access denied' });
    }

    return true;
  }
}
