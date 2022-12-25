const { default: Navbar } = require('~/components/Navbar');
import { useRouter } from 'next/router';

const statistics = () => {
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
                <h2>statistics daily</h2>
            </div>
        </div>
    );
};

export default statistics;
