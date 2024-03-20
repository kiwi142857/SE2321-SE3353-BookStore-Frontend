import React from "react";
import useMessage from "antd/es/message/useMessage";
import { Link } from "react-router-dom";
import { Button, theme, Form, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { Tabs } from "antd";
import { useState } from 'react';
import { BasicLayout } from "../components/layout";
import JAccountLogin from "../components/jaccountLogin";
import RegisterForm from "../components/registerForm";
import { handleBaseApiResponse } from "../utils/message";
import { login } from "../service/login";
import '../css/global.css';

function LoginForm({ setIsFormVisible, loginType, setLoginType, JacProps }) {
  const { captcha, captchaIndex, setCaptchaIndex, userCaptcha, setUserCaptcha } = JacProps;

  return ( // if log in
    <>
      <Tabs centered activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey)}>
        <Tabs.TabPane key={'account'} tab={'Account'} />
        <Tabs.TabPane key={'jaccount'} tab={'JAccount'} />
      </Tabs>

      {(loginType === 'account') &&
        <>
          <ProFormText name="username"
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
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="Captcha"
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
            />

          </Form.Item>
          <div style={{ marginBlockEnd: 24 }} >
            <Button className="login-form-info" onClick={(event) => { event.preventDefault(); setIsFormVisible(true); }} backgroundColor='none'>创建账号</Button>
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

  const onSubmit = async (values) => {
    let email = values['username'];
    let password = values['password'];

    let res = await login(email, password);
  
    if (!isFormVisible) {
      if (values.captcha !== captcha[captchaIndex]) {
        messageApi.error('Captcha is wrong!');
        return;
      } else {
        handleBaseApiResponse(res, messageApi, () => navigate("/"));
      };
    }
    else {
      setIsFormVisible(false);
    }
    navigate('/home');
  };


  const [loginType, setLoginType] = useState('account');

  const captcha = ['wbusk', 'amvo', 'qhxxx'];
  const [captchaIndex, setCaptchaIndex] = useState(0);
  const [userCaptcha, setUserCaptcha] = useState('');
  const { token } = theme.useToken();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const JacProps = { captcha, captchaIndex, setCaptchaIndex, userCaptcha, setUserCaptcha };
  const LoginFormProps = { setIsFormVisible, loginType, setLoginType, JacProps };

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
            searchConfig:{
            },
            submitButtonProps:{
              style:{
                width:'100%',
                top:'-20px',
              }
            },
            resetButtonProps:false
          }}
        logo={process.env.PUBLIC_URL + 'icon.svg'}
        title="Book Store"
        subTitle="欢迎来到电子书店！"
        onFinish={onSubmit}
        activityConfig={{   // activity of bookstore
          style: {
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
            color: token.colorTextHeading,
            borderRadius: 8,
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
                background: token.colorBgElevated,
                color: token.colorPrimary,
                width: 120,
              }}
            >
              <Link to="/home">去看看</Link>
            </Button>
          ),
        }}
      >
        {isFormVisible && (  // if create a new account
          <>
            <Tabs
              centered
              activeKey={loginType}
              onChange={(activeKey) => setIsFormVisible(activeKey === 'logIn' ? false : true)}
              defaultActiveKey="signUp"
            >
              <Tabs.TabPane key={'logIn'} tab={'Log in'} />
              <Tabs.TabPane key={'signUp'} tab={'Sign up'} />
            </Tabs>
            <RegisterForm />
          </>
        )}
        {(!isFormVisible) && <LoginForm {...LoginFormProps} />}
      </LoginFormPage>
    </BasicLayout >
  );
};
export default LoginPage;