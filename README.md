# Book Store Frontend

作者：陈启炜

## Hint 作业测试说明

    默认进入页面为HomePage，点击右上角头像进入LoginPage。

## 项目结构

``` constructure
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
目前完成loginPage，HomePage的前端工程。

## 项目使用工具

**框架**：React框架，使用``create-react-app``作为脚手架  
**组件库**：``Ant Design``和``Ant Design Pro``组件库

### 项目启动方式

在``bookstore``目录下键入``npm start``。

## 项目情况简介

1. 完成``LoginPage``的前端构建（目前均未接入后端数据）
    - 完成``用户名``和``密码``登入，未接入后端
    - 增添``验证码``功能，但是未接入后端，因此目前验证码为三张照片循环。
    - 设置``Account``和``JAccount``两种登入方式，但未接入甲亢登入的API，因此目前做成模拟界面，二维码导向``www.sjtu.edu.cn``网站。
    - ``loginPage``底部的链接为作者``Github``主页与作者博客地址。
    - 完成``Create a new account``表单，信息为``UserName``，``Email``，``Passport``，但未接入后端，故仅保存数据，未对表单内容处理。
    - 由于未接入后端数据库，因此只要验证码正确且``用户名``和``密码``不为空即可登录。
    - 点击效果：导航栏点击后跳转到相应页面（目前仅完成Login，Home，点击``logo``，``Title:BookStore``，``Home``进入Home界面）  
点击``Account``和``JAccount``切换登入方式，点击验证码图案更换图片。  
在验证码正确的情况下，点击``登录``进入HomePage。

2. 完成``HomePage``的前端建设（目前均未接入后端数据）
    - 完成搜索框以及``Tab``（选择按照``Title``，``Author``）进行查找书籍
    - 完成``Navigate Menu``，导航菜单，按照``理科``,``工科``等科目进行书籍分类
    - 完成走马灯式展示书籍Ad,或新书状况浏览（目前图片设计为世界读书日照片，返校日促销广告）
    - 完成书籍展示布局，模仿[参考项目](https://github.com/Okabe-Rintarou-0/BookStore-Frontend "参考项目")，每行5个书籍布局
    - 完成书籍页面选择，目前无统计页面数，固定为2页
    - 书籍展示内容为``cover``，``Title``，``Author``，``Price``。
    - 点击效果：导航栏点击后跳转到相应页面（目前仅完成Login，Home，点击头像进入LoginPage）
  
3. 项目展示图
    ![LoginPage](./readmeSource/LoginPage.png)
    ![LoginForm](./readmeSource/LoginForm.png)
    ![JaccountLogin](./readmeSource/JaccountLogin.png)
    ![CreateNewCount](./readmeSource/CreateNewCount.png)
    ![HomePage](readmeSource/HomePage.png)

## 参考&&素材

1. TA项目 [参考项目](https://github.com/Okabe-Rintarou-0/BookStore-Frontend "参考项目")
2. 照片视频素材来源：[Pixbay](https://pixabay.com/)
