import Image from 'next/image';
import React, { useEffect } from 'react';
import { login } from '~/redux/actions/authAction';

import { useRef } from 'react';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const Login = () => {
    return (
        <div className="bg-signIn bg-cover w-screen h-screen flex flex-col justify-center items-center ">
            <MainLogin/>
        </div>
    );
};

const MainLogin = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const userEl = useRef('');
    const passEl = useRef('');

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');

        if (loggedIn !== 'true') {
            router.replace('/login');
        } else {
            router.replace(`/`);
        }
    }, []);

    const removeErr = (e) => {
        e.target.nextElementSibling.innerHTML = ""
    }

    const submitForm = (event) => {
        event.preventDefault();
        Validate();

        const data = {
            email: userEl.current.value,
            password: passEl.current.value,
        };

        dispatch(login(data));
    };

    const Validate = () => {
        if (userEl.current.value == '') {
            userEl.current.nextElementSibling.innerHTML = 'You must enter username';
            return false;
        } else if (passEl.current.value == '') {
            passEl.current.nextElementSibling.innerHTML = 'You must enter password';
            return false;
        } else {
            return true;
        }
    };
    // w-11/12 phone:w-500 mr-10 ml-10
    return (
        <div className="container w-full h-full flex items-center justify-center">
            <form
                onSubmit={submitForm}
                className="w-11/12 phone:w-500 h-680 pt-12 flex flex-col items-center bg-gradient-to-tr from-custom1/95 to-custom2/95 rounded-3xl sm:"
            >
                <span>
                    <Image
                        src="/../public/images/logo-apple1.jpg"
                        width={120}
                        height={120}
                        className="rounded-full opacity-70 border-4 border-solid border-white drop-shadow-xl"
                    />
                </span>

                <span>
                    <h2 className="mt-8 text-4xl font-montserrat text-white font-bold tracking-widest">LOG IN</h2>
                </span>

                <div className="wrap-input relative w-11/12 phone:w-5/6 h-max pt-12">
                    <AiOutlineUser className=" text-grey4 text-xl" />
                    <input
                        className="w-11/12 phone:w-5/6 ml-2 pb-2 font-poppins text-white text-xl bg-transparent border-solid border-0 border-b-4 border-b-grey1 transition-all duration-700 focus:border-b-white outline-none placeholder:text-white"
                        type="text"
                        name="username"
                        placeholder="Username"
                        ref={userEl}
                        onFocus={removeErr}
                    />
                    <div className="error-mess1 h-4 mt-3 text-red1 ml-8"></div>
                </div>

                <div className="wrap-input relative w-11/12 phone:w-5/6 h-max pt-8">
                    <AiOutlineLock className=" text-grey4 text-xl" />
                    <input
                        className="w-11/12 phone:w-5/6 ml-2 pb-2 font-poppins text-white text-xl bg-transparent border-solid border-0 border-b-4 border-b-grey1 transition-all duration-700 focus:border-b-white outline-none placeholder:text-white"
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="on"
                        ref={passEl}
                        onFocus={removeErr}
                    />
                    <div className="error-mess1 h-4 mt-3 text-red1 ml-8"></div>
                </div>

                <div className="relative w-11/12 phone:w-5/6 mt-4 flex items-center ">
                    <input
                        className="w-4 h-4"
                        id="checkbox1"
                        type={'checkbox'}
                        name="remember-me"
                    ></input>
                    <label htmlFor="checkbox1" className="ml-4 mr-2 text-base text-white">
                        Remember me
                    </label>
                </div>

                <div className="mt-14 w-1/3 h-10">
                    <button
                        type="submit"
                        className="text-xl text-semibold font-poppins p-0 w-full h-full rounded-full border-none bg-grey4 hover:bg-grey5 text-dark"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
