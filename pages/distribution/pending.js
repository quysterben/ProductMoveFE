import Navbar from '~/components/Navbar';
import { useRouter } from 'next/router';

const pending = () => {
    const router = useRouter();

    useEffect(() => {
        if (auth.loggedIn === false) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div>
            <Navbar />
            <div className="pt-[56px]">
                <h2>pending dai ly</h2>
            </div>
        </div>
    );
};

export default pending;
