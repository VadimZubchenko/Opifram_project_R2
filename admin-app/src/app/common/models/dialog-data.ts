import { DialogOpenAction } from './dialog-open-action';
import { Order } from './order';
import { Product } from './product';

export interface DialogData {
    action: DialogOpenAction;
    item: Product | Order;
}
