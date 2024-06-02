import { DUMMY_RESPONSE, PREFIX, getJson, post, del } from "./common";

export async function searchBooks(keyword, pageIndex, pageSize, searchType) {
    const url = `${PREFIX}/books/search?keyWord=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}&searchType=${searchType}`;
    let books;
    try {
        books = await getJson(url);
    } catch (e) {
        console.log(e);
        books = {
            total: 0,
            items: []
        };
    }
    return books;
}

export async function getBookById(id) {
    const url = `${PREFIX}/books/${id}`;
    let book;
    try {
        book = await getJson(url);
    } catch (e) {
        console.log(e);
        book = null;
    }
    return book;
}

export async function getTop10BestSellingBooks() {
    const url = `${PREFIX}/books/rank`;
    let books;
    try {
        books = await getJson(url);
    } catch (e) {
        console.log(e);
        books = null;
    }
    return books;
}

export async function getBookComments(bookId, pageIndex, pageSize, sort) {
    const url = `${PREFIX}/books/${bookId}/comments?pageIndex=${pageIndex}&pageSize=${pageSize}&sort=${sort}`;
    let comments;
    try {
        comments = await getJson(url);
    } catch (e) {
        console.log(e);
        comments = {
            total: 0,
            items: []
        };
    }
    return comments;
}

export async function addBookComment(bookId, content) {
    const url = `${PREFIX}/books/${bookId}/comments`;
    let res;
    try {
        res = await post(url, { 'content': content });
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function getBookRate(bookId) {
    const url = `${PREFIX}/books/${bookId}/rate`;
    let rate;
    try {
        rate = await getJson(url);
    } catch (e) {
        console.log(e);
        rate = null;
    }
    return rate;
}

export async function rateBook(bookId, rate) {
    const url = `${PREFIX}/books/${bookId}/rate?rate=${rate}`;
    let res;
    try {
        res = await post(url);
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function postBook(id,book) {
    const url = `${PREFIX}/books/${id}`;
    let res;
    try {
        res = await post(url, book);
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function deleteBook(id) {
    const url = `${PREFIX}/books/${id}`;
    let res;
    try {
        res = await del(url);
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

// 按照时间范围内销量排序获取书本，用于统计页面，同时有分页功能
export async function getBooksBySalesRank(pageIndex, pageSize, startTime, endTime) {
    const url = `${PREFIX}/books/rank/sales?pageIndex=${pageIndex}&pageSize=${pageSize}&startTime=${startTime}&endTime=${endTime}`;
    let books;
    try {
        books = await getJson(url);
    } catch (e) {
        console.log(e);
        books = {
            total: 0,
            items: []
        };
    }
    return books;
}