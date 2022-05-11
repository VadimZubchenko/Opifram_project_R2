const createFetcher = () => {

    const baseRequest = {
        method: '',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }

    const handleResponse = async (response) => {
        const baseResponse = { status: response.status };

        if (response.ok) {
            baseResponse.data = await response.json();
        } else {

            let errorName;
            let errorMessage;

            Object.entries(data).forEach((item) => {
                errorName = item[0];
                errorMessage = item[1];
            });

            if (!errorName && !errorMessage) {
                errorName = 'Unexpected error';
                errorMessage = "Something went wrong"
            }

            const error = {
                name: errorName,
                message: errorMessage,
                status: response.status
            }

            baseResponse.error = error;
        }

        return baseResponse;
    }

    return {
        get: async (path) => {
            baseRequest.method = 'GET';
            const response = await fetch(path, baseRequest);
            return await handleResponse(response);
        },
        post: async (path, data) => {
            baseRequest.method = 'POST';
            baseRequest.body = JSON.stringify(data);
            const response = await fetch(path, baseRequest);
            return await handleResponse(response);
        },
        put: async (path, data) => {
            baseRequest.method = 'PUT';
            baseRequest.body = JSON.stringify(data);
            const response = await fetch(path, baseRequest);
            return await handleResponse(response);
        },
        delete: async (path) => {
            baseRequest.method = 'DELETE';
            const response = await fetch(path, baseRequest);
            return await handleResponse(response);
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

 if (response.data) {
    console.log('Fetched data:', response.data);
 } else {
    console.log('Error name:', response.error.name);
    console.log('Error message:', response.error.message);
    console.log('Error status code:', response.error.status);
 }

*/


export const fetcher = createFetcher();