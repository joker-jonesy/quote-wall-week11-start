const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const TOKEN_KEY ="a_big_giraffe";

export const getToken = ()=> localStorage.getItem(TOKEN_KEY);
export const saveToken = (token)=> localStorage.setItem(TOKEN_KEY, token);
export const deleteToken = ()=> localStorage.removeItem(TOKEN_KEY);

let onUnauthorized = ()=>{};
export const setUnAuthorizedHandler = (fn)=>{ onUnauthorized = fn; };

export async function apiFetch(path, {method="GET", body, auth = true}={}){
    const headers = {};
    if(body !== undefined){
        headers['Content-Type'] = 'application/json';
    }

    if(auth && getToken()){
        headers.Authorization = `Bearer ${getToken()}`;
    }

    let res;

    try {
        res = await fetch(API_URL + path,{
            method,
            headers,
            body: body !==undefined ? JSON.stringify(body) : undefined,
        });
    }catch{
        throw new Error(`Can't reach the server`);
    }

    const data = res.status === 204 ? null : await res.json().catch(()=>null)

    if(!res.ok){
        if(res.status === 401 && auth){
            onUnauthorized();
        }

        throw new Error(data?.error || 'Request Failed');
    }


    return data;
}