import React, { useState } from "react";
import { Button, Form, Input, Tabs } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import useMessage from "antd/es/message/useMessage";
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { BasicLayout } from "../components/layout";
import JAccountLogin from "../components/jaccountLogin";
import RegisterForm from "../components/registerForm";
import { handleBaseApiResponse } from "../utils/message";
import { getMe } from "../service/user";
import { login } from "../service/login";
import { register } from "../service/auth";
import '../css/global.css';

function LoginForm({ setIsLoginFormVisbile, loginType, setLoginType, JacProps, setIsSignUp }) {
    const { captcha, captchaIndex, setCaptchaIndex, userCaptcha, setUserCaptcha } = JacProps;

    return ( // if log in
        <>
            <Tabs centered activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey)}>
                <Tabs.TabPane key={'account'} tab={'账户登录'} />
                <Tabs.TabPane key={'jaccount'} tab={'JAccount登录'} />
            </Tabs>

            {(loginType === 'account') &&
                <>
                    <ProFormText name="username"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined />,
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
                            prefix: <LockOutlined />,
                        }}
                        placeholder={'Password'}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    />

                    <Form.Item
                        name="captcha"
                        rules={[{ required: true, message: 'Please input your captcha!' }]}
                    >
                        <Input
                            addonAfter={
                                <button style={{ border: 'none' }} onClick={(event) => { event.preventDefault(); setCaptchaIndex((prevIndex) => (prevIndex + 1) % 3); }}>
                                    <img src={process.env.PUBLIC_URL + 'cap_' + captcha[captchaIndex] + '.png'} alt="Captcha" />
                                </button>
                            }
                            prefix={<LockOutlined />}
                            type="text"
                            placeholder="Captcha"
                            value={userCaptcha}
                            onChange={(e) => setUserCaptcha(e.target.value)}
                        />
                    </Form.Item>

                    <div style={{ marginBlockEnd: 24, marginTop: '40px' }} >
                        <Button className="login-form-info" onClick={(event) => { event.preventDefault(); setIsLoginFormVisbile(true); setIsSignUp(true); }} backgroundColor='none'>创建账号</Button>
                        <Button className="login-form-info" style={{ float: 'right' }}>忘记密码</Button>
                    </div>
                </>}
            {(loginType === 'jaccount') && < JAccountLogin {...JacProps} />}
        </>
    );
};

// Login page
const LoginPage = () => {

    const [messageApi, contextHolder] = useMessage();
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState('account');
    const [isSignUp, setIsSignUp] = useState(false);
    const captcha = ['wbusk', 'amvo', 'qhxxx'];
    const [captchaIndex, setCaptchaIndex] = useState(0);
    const [userCaptcha, setUserCaptcha] = useState('');
    const [isLoginFormVisbile, setIsLoginFormVisbile] = useState(false);

    const JacProps = { captcha, captchaIndex, setCaptchaIndex, userCaptcha, setUserCaptcha };
    const LoginFormProps = { setIsLoginFormVisbile, loginType, setLoginType, JacProps, setIsSignUp };

    const loginSumit = async (values) => {
        let username = values['username'];
        let password = values['password'];

        if (isLoginFormVisbile) { return; }

        if (values.captcha !== captcha[captchaIndex]) {
            messageApi.error('验证码输错了!');
            return;
        }
        else {
            let res = await login(username, password);
            handleBaseApiResponse(res, messageApi);
            if (res.ok === true) {
                navigate('/home');
            }
        };
    };

    const onSubmit = async (values) => {
        console.log("values: ", values);
        if (isSignUp) {
            let username = values['username'];
            let password = values['password'];

            console.log("username: ", username);
            console.log("password: ", password);
            let res = await register(values.username, values.password, values.email);
            handleBaseApiResponse(res, messageApi);
            if (res.ok === true) {
                setIsLoginFormVisbile(false);
                setIsSignUp(false);
            }
        }
        else {
            loginSumit(values);
        }
    };


    async function handleActivity() {
        let me = await getMe();
        if (me) {
            navigate('/home');
        }
        else {
            messageApi.error('请先登录!');
        }
    }

    return (
        <BasicLayout>
            {contextHolder}
            <LoginFormPage
                backgroundVideoUrl={process.env.PUBLIC_URL + 'loginBackGroundVideo.mp4'}
                mainStyle={{
                    position: 'relative',
                    top: '-40px',
                    bottom: '-30px',
                    marginBottom: '-30px',
                    height: '60%',
                }}
                submitter={{
                    submitButtonProps: {
                        style: {
                            width: '100%',
                            top: '-20px',
                        }
                    },
                    searchConfig: {
                        submitText: isSignUp ? '注册' : '登录',
                    },
                }
                }
                logo={process.env.PUBLIC_URL + 'icon.svg'}
                title="Book Store"
                subTitle="欢迎来到电子书店！"
                onFinish={onSubmit}
                activityConfig={{   // activity of bookstore
                    style: {
                        borderRadius: 20,
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        backdropFilter: 'blur(4px)',
                        fontFamily: 'inherit',
                    },
                    title: '开学季新书促销',
                    subTitle: 'SJTU教材促销活动正在进行中，快来选购吧！',
                    action: (
                        <Button
                            size="large"
                            style={{
                                borderRadius: 20,
                                width: 120,
                            }}
                            onClick={
                                handleActivity
                            }
                        >去看看
                        </Button>
                    ),
                }}
            >
                {isLoginFormVisbile && (  // if create a new account
                    <>
                        <Tabs
                            centered
                            activeKey={isSignUp ? 'signUp' : 'logIn'}
                            onChange={(activeKey) => {
                                setIsSignUp(activeKey === 'signUp');
                                if (activeKey !== 'signUp') {
                                    setIsLoginFormVisbile(false);
                                }
                            }}
                            defaultActiveKey="signUp"
                        >
                            <Tabs.TabPane key={'logIn'} tab={'登录'} />
                            <Tabs.TabPane key={'signUp'} tab={'注册'} />
                        </Tabs>
                        <RegisterForm />
                    </>
                )}
                {(!isLoginFormVisbile) && <div style={{ marginBottom: '8%' }}><LoginForm {...LoginFormProps} /></div>}
            </LoginFormPage>
        </BasicLayout >
    );
};
export default LoginPage;