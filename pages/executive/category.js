const { default: Navbar } = require('~/components/Navbar');
import { useRouter } from 'next/router';

const category = () => {
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
                <h2>category</h2>
            </div>
        </div>
    );
};

export default category;
