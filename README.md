# SE2321 & SE3353 Book Store Frontend

本项目为SE2321和SE3353课程的Book Store前端项目。
由于课程实现内容较多，电脑负载较大（16GB RAM Windows 11稍显卡顿），因此在SE3353课程其中以前的部分作为matser分支，其余作为``feature-after-middle``分支以方便运行。

本项目结构学习TA项目 [参考项目](https://github.com/Okabe-Rintarou-0/BookStore-Frontend "参考项目")

## 项目使用工具

**框架**：React框架，使用``create-react-app``作为脚手架  
**组件库**：``Ant Design``和``Ant Design Pro``组件库

### 项目启动方式

在``bookstore``目录下键入``npm start``。

## 项目情况简介

1. 项目展示图
    ![LoginPage](./readmeSource/LoginPage.png)
    ![CreateNewCount](./readmeSource/CreateNewCount.png)
    ![HomePage](readmeSource/HomePage.png)
    ![BookPage](readmeSource/bookPage.png)
    ![CartPage](readmeSource/cartPage.png)
    ![OrderPage](readmeSource/orderPage.png)
    ![RankPage](./readmeSource/RankPage.png)

## 项目经验总结

1. 第一次写前端项目，模块化思维不够，导致代码冗余，后期需要重构。eg. 在``LoginPage``中，直接写各个组件的内容，导致该函数过长，后期需要重构。
2. 第一次使用``Ant Design``组件库，对于组件的使用不够熟练，导致代码冗余，后期需要重构。
3. 经过``Order``界面重构经验，体会到前端代码如何体现更好的设计规范，更能理解示例代码。

## 参考&&素材

1. TA项目 [参考项目](https://github.com/Okabe-Rintarou-0/BookStore-Frontend "参考项目")
2. 照片视频素材来源：[Pixbay](https://pixabay.com/)
