import React from "react";

import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import useMessage from "antd/es/message/useMessage";
import { Link, useNavigate } from "react-router-dom";
import { BasicLayout } from "../components/layout";
import { login } from "../service/login";
import { handleBaseApiResponse } from "../utils/message";
import '../css/global.css';

const LoginPage = () => {
    const [messageApi, contextHolder] = useMessage();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        let email = values['username'];
        let password = values['password'];

        let res = await login(email, password);
        handleBaseApiResponse(res, messageApi, () => navigate("/"));
    };

    return (
        <BasicLayout>
            {contextHolder}
            <LoginFormPage
                backgroundImageUrl={process.env.PUBLIC_URL + 'loginBackground.png'}
                logo={process.env.PUBLIC_URL + '/logo.webp'}
                title="Book Store"
                subTitle="SJTU"
                onFinish={onSubmit}
                style={{ height: "80vh" }}
            >
                <ProFormText
                    className="form-opacity"
                    name="username"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'请输入用户名'}
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                    ]}
                />
                <ProFormText.Password
                    name="password"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'密码'}
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                    ]}
                />
                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <Link className="login-form-info" to='/register'>新账号？前往注册</Link>
                    <Link className="login-form-info" style={{
                        float: 'right',
                    }} to='/forget'>忘记密码？</Link>
                </div>
            </LoginFormPage>
        </BasicLayout>
    );
};
export default LoginPage;