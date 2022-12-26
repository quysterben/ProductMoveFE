import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
    const { auth } = useSelector((state) => state);
    const router = useRouter();

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn !== 'true') {
            router.push('/login');
        } else {
            router.push(`/${auth.user.role}/statistics/`);
        }
    }, []);

    return (
        <div>
            <div id="loading-wrapper">
                <div id="loading-text">LOADING</div>
                <div id="loading-content"></div>
            </div>
        </div>
    );
};

export default Home;
