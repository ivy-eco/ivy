export type HTTPError = {
    error: string,
    message: string,
    statusCode: number,
}

class HttpClient {
    private _prefix: string;

    constructor(prefix:string = "") {
        this._prefix = prefix;
    }

    async request <T>(endpoint:string, method: "GET" | "POST", body?:any) {
        const res = await fetch(this._prefix + endpoint, {
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

    get <T>(endpoint:string) {
        return this.request<T>(endpoint, "GET");
    };
    
    post <T>(endpoint:string, data:any) {
        return this.request<T>(endpoint, "POST", data)
    };
}

export const http = new HttpClient(`/${__APP_PREFIX__}`);