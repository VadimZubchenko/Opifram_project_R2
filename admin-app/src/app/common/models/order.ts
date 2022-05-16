import { OrderStatus } from './order-status';
import { OrderedProduct } from './ordered-product';
import { User } from './user';

export interface Order {
    id: string;
    user: User;
    products: OrderedProduct[];
    status: OrderStatus;
    sum: number;
    createdAt: Date;
    updatedAt: Date;
    sentAt?: Date;
}
