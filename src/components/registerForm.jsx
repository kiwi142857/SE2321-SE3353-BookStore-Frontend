import React from 'react';
import {
  Form,
  Input,
} from 'antd';

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
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: '86',
      }}
      style={{
        maxWidth: '120%'
      }}
      scrollToFirstError
    >
      <Form.Item style={{ width: '120% ' }}
        name="nickname"
        label="昵称"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input style={{marginBottom:'4%'}}/>
      </Form.Item>

      <Form.Item style={{ width: '120% ' }}
        name="email"
        label="E-mail"
        rules={[
          
          {
            required: true,
            
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input style={{marginBottom:'4%'}}/>
      </Form.Item>

      <Form.Item style={{ width: '120% ' }}
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password style={{marginBottom:'4%'}}/>
      </Form.Item>

      <Form.Item style={{ width: '120% ', marginBottom: '20%' }}
        name="confirm"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          
        ]}
      >
        <Input.Password style={{marginBottom:'4%'}}/>
      </Form.Item>

    </Form>
  );
};
