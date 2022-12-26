const { default: Navbar } = require('~/components/Navbar');
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const statistics = () => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {}, [router]);

    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-[56px]">
                <h2>statistics</h2>
            </div>
        </div>
    );
};

export default statistics;
