export async function getJson(url) {
    let res = await fetch(url, { method: "GET", credentials: "include" });
    if (res.status !== 200) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
}

export async function get(url) {
    let res = await fetch(url, { method: "GET", credentials: "include" });
    return res;
}

export async function put(url, data) {
    let opts = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    let res = await fetch(url, opts);
    return res.json();
}

export async function del(url, data) {
    let res = await fetch(url, { method: "DELETE", credentials: "include", body: JSON.stringify(data) });
    return res.json();
}


export async function post(url, data) {
    let opts = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    let res = await fetch(url, opts);
    return res.json();
}

// export const BASEURL = process.env.REACT_APP_BASE_URL ?? 'https://10.119.12.209:8080';
export const BACKEND_SERVER_IP = process.env.REACT_APP_BACKEND_SERVER_IP ?? 'localhost';
export const websocketUrl = `ws://${BACKEND_SERVER_IP}:8080/order/websocket`;
export const BASEURL = process.env.REACT_APP_BASE_URL ?? 'http://localhost:8080';
export const PREFIX = `${BASEURL}/api`;
export const API_DOCS_URL = `${BASEURL}/api-docs`;
export const IMAGE_PREFIX = `${BASEURL}/images`;
export const DUMMY_RESPONSE = {
    ok: false,
    message: "网络错误！"
};