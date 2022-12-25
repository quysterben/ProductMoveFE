import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (auth.loggedIn === false) {
            router.push('/login');
        } else {
            router.push(`/${auth.role}/statistics/`);
        }
    }, [router]);

    return <div></div>;
};

export default Home;
