import React from 'react';
import {
  Form,
  Input,
} from 'antd';
import { register } from '../service/auth';
import useMessage from 'antd/es/message/useMessage';
import Password from 'antd/es/input/Password';
import ProForm from '@ant-design/pro-form';
import ProFormText from '@ant-design/pro-form/lib/components/Text';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

// Register form
export default function RegisterForm() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = useMessage();
  const onFinish = (nickname, Password) => {
    let response = register(nickname, Password);
    if (response.status === 200) {
      messageApi.success('注册成功');
    }
    else {
      messageApi.error('注册失败');
    }
  };

  return (
    <>
      {contextHolder}
      <ProFormText
        name="username"
        label="昵称"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
        fieldProps={{
          style: { width: '80%', marginBottom: '-4%' }
        }}
      />

      <ProFormText
        name="email"
        label="E-mail"
        rules={[
          {
            required: true,
            message: 'Please input your E-mail!',
          },
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        ]}
        fieldProps={{
          style: { width: '80%', marginBottom: '-4%' }
        }}
      />

      <ProFormText.Password
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        fieldProps={{
          style: { width: '80%', marginBottom: '-4%' }
        }}
      />

      <ProFormText.Password
        name="confirm"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
        fieldProps={{
          style: { width: '80%', marginBottom: '-4%' }
        }}
      />

    </>
  );
};
