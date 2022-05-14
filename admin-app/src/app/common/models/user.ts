import { UserRole } from './user-role';

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: UserRole;
    address: string;
    id: string;
}
