import Image from 'next/image'
import React from 'react';
import { useRef, useState } from 'react';
// import { Button, Checkbox, Form, Input } from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

const Login = () => {
    return (
        <div className="bg-signIn bg-cover w-screen h-screen flex flex-col justify-center items-center ">
          {/* <div className=' flex flex-col justify-center items-center'>
              <Image 
                  src="/../public/images/logo-apple1.jpg" 
                  width={120}
                  height={120}
                  className="rounded-full opacity-70 border-4 border-solid border-white"
                  />
              <div className='rounded-3xl bg-grey3/70'>
                  {App()}
                </div>

          </div> */}
          {mainLogin()}
        </div>
    )
}

// bg-white bg-white/70 pt-20 pb-10 pr-10 pl-10 mt-[-8%]

const mainLogin = () => {

  const userEl = useRef(null)
  const passEl = useRef(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitForm = (event) => {
    event.preventDefault()
    console.log("form submited")
    Validate()
  }

  // const inputName = document.getElementById("username")

  const Validate = () => {
    
    if (username == '') {
      userEl.current.nextElementSibling.innerHTML = "You must enter username"
      console.log("username is empty")
    }
    if (password == '') {
      passEl.current.nextElementSibling.innerHTML = "You must enter password"
      console.log("password is empty")
    }
  }

  const usernameChange = () => {
    setUsername(userEl.current.value)
    userEl.current.nextElementSibling.innerHTML = ""
  }
  const passwordChange = () => {
    setPassword(passEl.current.value)
    passEl.current.nextElementSibling.innerHTML = ""
  }
  
  return (
    <div className='container w-full h-full flex items-center justify-center'>
      <form onSubmit={submitForm} className='w-1/3 h-5/6 pt-12 flex flex-col items-center bg-gradient-to-tr from-custom1/95 to-custom2/95 rounded-3xl'>
        <span>
          <Image 
                      src="/../public/images/logo-apple1.jpg" 
                      width={120}
                      height={120}
                      className="rounded-full opacity-70 border-4 border-solid border-white drop-shadow-xl"
          />
        </span>

        <span>
          <h2 className='mt-8 text-3xl font-poppins text-white font-bold'>LOG IN</h2>
        </span>

        <div className='wrap-input relative w-5/6 h-max pt-12'>
          <AiOutlineUser className=' text-grey4 text-xl'/>
          <input className='w-5/6 ml-2 pb-2 font-poppins text-white text-xl bg-transparent border-solid border-0 border-b-4 border-b-grey1 transition-all duration-700 focus:border-b-white outline-none placeholder:text-white'
                 type='text' 
                 name='username' 
                 placeholder='Username' 
                 ref={userEl}
                 onChange={usernameChange}
                 />
          <div className='error-mess1'></div>
        </div>

        <div className='wrap-input relative w-5/6 h-max pt-12'>
          <AiOutlineLock className=' text-grey4 text-xl'/>
          <input className='w-5/6 ml-2 pb-2 font-poppins text-white text-xl bg-transparent border-solid border-0 border-b-4 border-b-grey1 transition-all duration-700 focus:border-b-white outline-none placeholder:text-white' 
                 type='password' 
                 name='password' 
                 placeholder='Password' 
                 ref={passEl}
                 onChange={passwordChange}
                 />
          <div className='error-mess1'></div>
        </div>

        <div className='mt-6 mr-64 flex items-center'>
          <input className='w-4 h-4' id='checkbox1' type={'checkbox'} name='remember-me'></input>
          <label htmlFor='checkbox1' className='ml-4 mr-2 text-base text-white'>Remember me</label>
        </div>

        <div className='mt-14 w-1/3 h-10'>
          <button type="submit" className='text-xl text-semibold font-poppins p-0 w-full h-full rounded-full border-none bg-grey4 hover:bg-grey5 text-dark'>
            Login
          </button>
          
        </div>

      </form>
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
      // labelCol={{
      //   span: 8,
      // }}
      // wrapperCol={{
      //   span: 16,
      // }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className='w-1/3 h-5/6 pt-12 flex flex-col items-center bg-gradient-to-tr from-custom1/95 to-custom2/95 rounded-3xl' 
      >

      <Form.Item className=''>
        <Image 
                    src="/../public/images/logo-apple1.jpg" 
                    width={120}
                    height={120}
                    className="rounded-full opacity-70 border-4 border-solid border-white drop-shadow-xl"
        />

        <h2 className='mt-4 text-3xl font-poppins text-white'>LOG IN</h2>
      </Form.Item>

      <Form.Item
        // label="Username"
        name="username"
        rules={[{required: true, message: 'Please input your username!',}, ]}
        className='w-5/6 h-max pt-8'
      >
        
        <AiOutlineUser fontSize={'24px'}/>
        <Input
          // prefix={<UserOutlined />}
          placeholder='Username'
          className='font-poppins text-xl bg-transparent border-solid border-0 border-b-4 border-b-grey1 focus:border-b-grey2'/>
        
      </Form.Item>

      <Form.Item
        // label="Password"
        name="password"
        rules={[{required: true,message: 'Please input your password!',},]}
        className='w-5/6 h-max pt-4'
        >
        <AiOutlineLock fontSize={'24px'}/>
        <Input
          // prefix={<LockOutlined />}
          type='password'
          placeholder='Password'
          className='font-poppins text-xl bg-transparent border-solid border-0 border-b-4 border-b-grey1 focus:border-b-grey2'/>
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        // wrapperCol={{
        //   offset: -10,
        //   span: 16,
        // }}
        className='pt-3 mr-72 ml-3' 
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        // wrapperCol={{
        //   offset: 8,
        //   span: 16,
        // }}
        className='pt-16'
      >
        <Button type="primary" htmlType="submit" >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

/*
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
*/

export default Login