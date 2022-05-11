import { apiURI } from "../config";
import { fetcher } from "../fetcher";

const getProducts = async () => {
    const response = await fetcher.get(`${apiURI}/product`);
    return response;
}

const getProduct = async (id) => {
    const response = await fetcher.get(`${apiURI}/product/${id}`);
    return response;
}

export const productService = {
    getProducts,
    getProduct
}