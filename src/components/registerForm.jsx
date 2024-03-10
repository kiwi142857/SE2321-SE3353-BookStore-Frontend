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
        label="Nickname"
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
        label="Password"
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

      <Form.Item style={{ width: '120% ', marginBottom: '12%' }}
        name="confirm"
        label="ConfirmPassword"
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
