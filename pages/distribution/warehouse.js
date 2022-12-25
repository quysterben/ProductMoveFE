import Navbar from '~/components/Navbar';
import { useRouter } from 'next/router';

const warehouse = () => {
    const router = useRouter();

    useEffect(() => {
        if (auth.loggedIn === false) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-[56px]">
                <h2>warehouse dai ly</h2>
            </div>
        </div>
    );
};

export default warehouse;
