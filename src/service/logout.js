import { DUMMY_RESPONSE, PREFIX, put } from "./common";

export async function logout() {
    const url = `${PREFIX}/auth/logout`;
    let res;
    try {
        res = await put(url);
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}