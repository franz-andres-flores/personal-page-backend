import { UserRole } from "src/common/enums";

export interface JwtPayload {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
}