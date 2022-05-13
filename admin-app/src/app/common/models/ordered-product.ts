import { Order } from './order';

export interface OrderedProduct extends Order {
    amount: number;
}
