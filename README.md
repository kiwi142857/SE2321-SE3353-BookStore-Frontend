# Book Store Frontend

作者：陈启炜

## 项目结构

```
D:\bookStore_frontend\bookstore
├── developMD.md
├── package-lock.json
├── package.json
├── public
├── README.md
└── src 
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── components
    ├── css
    ├── image
    ├── index.css
    ├── index.js
    ├── lib
    ├── logo.svg
    ├── page
        ├── book.jsx
        ├── cart.jsx
        ├── home.jsx
        ├── login.jsx
        ├── order.jsx
        ├── rank.jsx
        └── router.jsx
    ├── reportWebVitals.js
    ├── service
    ├── setupTests.js
    └── utils
```

本项目结构学习TA项目 [参考项目](https://github.com/Okabe-Rintarou-0/BookStore-Frontend "参考项目")
目前完成loginPage的前端工程。

## 项目使用工具

**框架**：React框架，使用``create-react-app``作为脚手架
**组件库**：``Ant Design``和``Ant Design Pro``组件库

## 项目情况简介

1. 完成``LoginPage``的前端构建。
    - 完成``用户名``和``密码``登入
    - 增添``验证码``功能，但是未接入后端，因此目前验证码为三张照片循环。
    - 设置``Account``和``JAccount``两种登入方式，但未接入甲亢登入的API，因此目前做成模拟界面，二维码导向``www.sjtu.edu.cn``网站。
    - ``loginPage``底部的链接为作者``Github``主页与作者博客地址。
    - 完成``Create a new account``表单，信息为``UserName``，``Email``，``Passport``，但未接入后端，故仅保存数据，未对表单内容处理。
2. 项目展示图
    ![LoginPage](./readmeSource/LoginPage.png)
    ![LoginForm](./readmeSource/LoginForm.png)
    ![JaccountLogin](./readmeSource/JaccountLogin.png)
    ![CreateNewCount](./readmeSource/CreateNewCount.png)