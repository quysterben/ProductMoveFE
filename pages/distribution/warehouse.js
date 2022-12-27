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
            <div className="pt-[88px]">
                <div className="flex justify-between">
                    <h2 className="font-bold">Products Manegement</h2>
                    <div>
                        <Button
                            className="mr-6 bg-color3 border-color1 hover:bg-color2 hover:text-color1"
                            type="primary"
                        >
                            Export excel
                        </Button>
                        <Button
                            className="bg-color3 border-color1 hover:bg-color2 hover:text-color1"
                            type="primary"
                            //onClick={() => showModal()}
                        >
                            Add Lot
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default warehouse;
