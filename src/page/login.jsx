import React from "react";
import { Button, theme } from 'antd';
import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { LoginFormPage, ProFormText, LoginForm } from '@ant-design/pro-components';
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

    const { token } = theme.useToken();
    return (
        <BasicLayout>
            {contextHolder}
            <LoginFormPage
                backgroundVideoUrl={process.env.PUBLIC_URL + 'loginBackGroundVideo.mov'}
                logo={process.env.PUBLIC_URL + 'icon.svg'}
                title="Book Store"
                subTitle="             --SJTU"
                onFinish={onSubmit}
                style={{ height: "80vh" }}
                activityConfig={{
                    style: {
                      boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                      color: token.colorTextHeading,
                      borderRadius: 8,
                      backgroundColor: 'rgba(255,255,255,0.25)',
                      backdropFilter: 'blur(4px)',
                    },
                    title: '开学季新书促销',
                    subTitle: 'SJTU教材促销活动正在进行中，快来选购吧！',
                    action: (
                      <Button
                        size="large"
                        style={{
                          borderRadius: 20,
                          background: token.colorBgElevated,
                          color: token.colorPrimary,
                          width: 120,
                        }}
                      >
                        <Link to="/activity">去看看</Link>
                      </Button>
                    ),
                  }}
            >
                
                <ProFormText
                    className="form-opacity"
                    name="username"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'Username'}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                />
                <ProFormText.Password
                    name="password"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'Password'}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                />
                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <Link className="login-form-info" to='/register'>Create a new account</Link>
                    <Link className="login-form-info" style={{
                        float: 'right',
                    }} to='/forget'>Forget your password</Link>
                </div>
            </LoginFormPage>
        </BasicLayout>
    );
};
export default LoginPage;