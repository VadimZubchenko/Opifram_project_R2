import { DialogOpenAction } from './dialog-open-action';
import { Product } from './product';

export interface DialogData {
    action: DialogOpenAction;
    item: Product | undefined;
}
