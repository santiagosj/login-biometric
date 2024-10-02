/**
 * Type for allowed HTTP methods
 */

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * HTTP  request options
 */

interface HttpRequestOptions {
    method: HttpMethod;
    headers: Record<string, string>;
    body?: string;
}

/**
 * Factory function to create HTTP requests.
 * 
 * @param method - The HTTP method to use (GET, POST, etc).
 * @param url - The URL to make the request to.
 * @returns An async function that takes optional data as body and returns the response
 */

export const httpRequestFactory = <T>(method: HttpMethod, url: string) => {
    return async (data?: unknown): Promise<T | null> => {
        const options: HttpRequestOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : undefined,
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result: T = await response.json()
            return result;
        } catch (err) {
            console.error(err);
            return null;
        }
    };
}