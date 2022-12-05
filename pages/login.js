import Image from 'next/image'
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const Login = () => {
    return (
        <div className="bg-signIn h-screen flex flex-col justify-center items-center ">
            <div className=' flex flex-col justify-center items-center'>
                <Image 
                    src="/../public/images/logo-apple1.jpg" 
                    width={120}
                    height={120}
                    className="rounded-full opacity-70 border-4 border-solid border-white"
                    />
                <div className='rounded pt-20 pb-10 pr-10 pl-10 bg-white mt-[-8%] bg-white/70 '>
                    {App()}
                </div>
            </div>
        </div>
    )
}

const App = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className=''
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login