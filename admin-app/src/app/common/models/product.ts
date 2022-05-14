import { ProductCategory } from './product-category';

export interface Product {
    name: string;
    description: string;
    category: ProductCategory;
    price: number;
    quantity: number;
    image: number;
    id: string;
}
