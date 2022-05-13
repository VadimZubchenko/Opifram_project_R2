import { Order } from "./order";
import { User } from "./user";

export interface OrderedProduct extends Order {
    amount: number;
}
