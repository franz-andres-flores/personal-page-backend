import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err, admin) {
        if (err || !admin) {
            console.log("error", err, admin);
            throw new UnauthorizedException('No existe el token');
        }
        return admin;
    }
}
