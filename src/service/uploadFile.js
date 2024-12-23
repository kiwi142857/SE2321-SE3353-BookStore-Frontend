import { BASEURL } from "./common";

export async function uploadFile(url, file) {
    const formData = new FormData();
    formData.append('image', file);
    const fetchUrl = BASEURL + url;
    try {
        console.log('fetchUrl:', fetchUrl);
        const response = await fetch(fetchUrl, {
            method: 'POST',
            body: formData,
            // 不设置 Content-Type，让浏览器自动处理
            // 这对于 multipart/form-data 是必要的
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // 处理服务器响应的数据
        const data = await response.json();
        return data; // 返回数据以便调用者使用
    } catch (error) {
        console.error('Error:', error);
        throw error; // 将错误抛出，让调用者处理
    }
}