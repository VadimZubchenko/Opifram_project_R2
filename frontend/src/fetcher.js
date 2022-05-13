const createFetcher = () => {

    const baseRequest = {
        method: '',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }

    const handleResponse = async (response) => {
        const baseResponse = {};

        if (response.ok) {
            baseResponse.data = await response.json();
        } else {
            baseResponse.errorCode = response.status;
        }

        return baseResponse;
    }

    return {
        get: async (path) => {
            baseRequest.method = 'GET';
            const response = await fetch(path, baseRequest);
            await handleResponse(response);
        },
        post: async (path, data) => {
            baseRequest.method = 'POST';
            baseRequest.body = JSON.stringify(data);
            const response = await fetch(path, baseRequest);
            await handleResponse(response);
        },
        put: async (path, data) => {
            baseRequest.method = 'PUT';
            baseRequest.body = JSON.stringify(data);
            const response = await fetch(path, baseRequest);
            await handleResponse(response);
        },
        delete: async (path) => {
            baseRequest.method = 'DELETE';
            const response = await fetch(path, baseRequest);
            await handleResponse(response);
        },
        config: {
            setAuthToken: (token) => {
                baseRequest.headers = { ...baseRequest.headers, 'Authorization': `Bearer ${token}` };
            }
        },
        debug: {
            getHeaders: () => {
                return baseRequest.headers;
            }
        }
    }
}

/* EXAMPLE USAGE

const response = await fetcher.get('/product');
or with service
const response = await productService.getProducts();

if (response.data) {
    SUCCESS
    console.log('Fetched data:', response.data);
} else {
    ERROR
    console.log('Error code:, response.errorCode);
}

*/

export const fetcher = createFetcher();