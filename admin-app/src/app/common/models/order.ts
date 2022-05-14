import { OrderStatus } from './order-status';
import { OrderedProduct } from './ordered-product';
import { User } from './user';

export interface Order {
    user: User;
    products: OrderedProduct[];
    status: OrderStatus;
    sum: number;
    createdAt: Date;
    id: string;
}
