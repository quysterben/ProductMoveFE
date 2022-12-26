const { default: Navbar } = require('~/components/Navbar');
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const model = () => {
    const router = useRouter();

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn !== 'true') {
            router.push('/login');
        }
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-[88px]">
                <h2>model</h2>
            </div>
        </div>
    );
};

export default model;
