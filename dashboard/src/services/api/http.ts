export type HTTPError = {
    error: string,
    message: string,
    statusCode: number,
}

const request = async <T>(endpoint:string, method: "GET" | "POST", body?:any) =>{
    const res = await fetch(endpoint, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null
    });

    const data = await res.json();

    if(data.error)
        return data as HTTPError;

    return data as T;
}

export const http = {
    get: <T>(endpoint:string) => request<T>(endpoint, "GET"),
    post: <T>(endpoint:string, data:any) => request<T>(endpoint, "POST", data),
};