import { DUMMY_RESPONSE, PREFIX, getJson, post } from "./common";

export async function placeOrder(orderInfo) {
    const url = `${PREFIX}/order`;
    let res;
    try {
        res = post(url, orderInfo);
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function getOrders(pageIndex= 1, pageSize= 10) {
    const url = `${PREFIX}/order?pageIndex=${pageIndex-1}&pageSize=${pageSize}`;
    let orders;
    try {
        orders = await getJson(url);
    } catch (e) {
        console.log(e);
        orders = []
    }
    return orders;
}