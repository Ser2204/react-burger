export default class Api {
    private _baseUrl: string;
    private _headers: Record<string,string>;

    constructor({ headers, baseUrl } : { headers: Record<string,string> , baseUrl: string}) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    async _request(url: string, options: Record<string, any>) {
        const res = await fetch(url, options);
        return this._checkResponse(res);
    }

    _checkResponse(res: Response) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getIngredients() {
        return this._request(`${this._baseUrl}/api/ingredients`, { headers: this._headers });
    }

    setOrder({ ingredientIdentifiers } : { ingredientIdentifiers: string[]}) {
        console.log(ingredientIdentifiers)
        return this._request(`${this._baseUrl}/api/orders`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ ingredients: ingredientIdentifiers }),
        });
    }
}
