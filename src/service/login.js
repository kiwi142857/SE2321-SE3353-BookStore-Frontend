import { PREFIX, post } from "./common";

export async function login(username, password) {
    const url = `${PREFIX}/auth/login`;
    let result;

    try {
    result = await post(url, { username, password });
    if (result.status === 'forbidden') {
        result = {
            ok: false,
            message: "您的账户被封禁！",
        }
    }
} catch (e) {
    console.log(e);
    result = {
        ok: false,
        message: "网络错误！",
    }
}
    return result;
}