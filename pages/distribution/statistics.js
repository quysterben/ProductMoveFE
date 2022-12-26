const { default: Navbar } = require('~/components/Navbar');
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const statistics = () => {
    const router = useRouter();
    const { auth } = useSelector((state) => state);

    useEffect(() => {
        // if (loggedIn === false) {
        //     router.push('/login');
        // }
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-[56px]">
                <h2>statistics daily</h2>
            </div>
        </div>
    );
};

export default statistics;
