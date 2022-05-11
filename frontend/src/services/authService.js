import { apiURI } from "../config";
import { fetcher } from "../fetcher";

const login = async (creds) => {
    const response = await fetcher.post(`${apiURI}/auth/login`, creds);
    return response;
}

export const authService = {
    login
}