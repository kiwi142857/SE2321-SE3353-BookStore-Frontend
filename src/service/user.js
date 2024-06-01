import { DUMMY_RESPONSE, PREFIX, getJson, put } from "./common";

export async function getMe() {
    const url = `${PREFIX}/user/me`;
    let me = null;
    try {
        me = await getJson(url);
    } catch(e) {
        console.log(e);
    }
    return me;
}

export async function changePassword(request) {
    const url = `${PREFIX}/user/me/password`;
    let res;
    try {
        res = await put(url, request);
    } catch(e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function updateProfile(request) {
    const url = `${PREFIX}/user/me`;
    let res;
    try {
        res = await put(url, request);
    } catch(e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function getUserList(pageIndex = 1, pageSize = 10, keyWord ="", id = -1) {
    
    if(id == 'undefined' || id == null || id == '') id = -1;
    console.log("getUserList", pageIndex, pageSize, keyWord, id);
    const url = `${PREFIX}/user/list?pageIndex=${pageIndex-1}&pageSize=${pageSize}&keyWord=${keyWord}&id=${id}`;
    let users;
    try {
        users = await getJson(url);
    } catch(e) {
        console.log(e);
        users = [];
    }
    return users;
}

export async function toggleUserStatus(userId) {
    const url = `${PREFIX}/user/ban/${userId}`;
    let res;
    try {
        res = await put(url);
    } catch(e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}