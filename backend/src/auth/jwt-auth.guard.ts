import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
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
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }

    try {
      req.user = this.jwtService.verify<JwtPayload>(token);
      return true;
    } catch (e: unknown) {
      throw new UnauthorizedException({ message: `User unauthorized: ${e}` });
    }
  }
}
