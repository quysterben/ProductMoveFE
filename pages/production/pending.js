import Navbar from '~/components/Navbar';
import { Button, Switch } from 'antd';

const pending = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-[88px] px-16">
                <div className="flex justify-between">
                    <h2 className="font-bold">Products Delivery</h2>
                    <div>
                        <Switch
                            className="bg-color3 mr-8"
                            checkedChildren="Incoming"
                            unCheckedChildren="Delivering"
                            defaultChecked
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default pending;
