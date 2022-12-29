import Navbar from '~/components/Navbar';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { getDeliveringData, getIncomingData } from '~/redux/actions/deliveryAction';
import { Button, Table, Modal, Form, Input, Select, Switch } from 'antd';
import { getAllUsers } from '~/redux/actions/userAction';

import { AiOutlineFileDone } from 'react-icons/ai';

const pending = () => {
    const { auth, delivery, user } = useSelector((state) => state);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn !== 'true') {
            router.push('/login');
        }
        dispatch(getIncomingData({ auth }));
        dispatch(getDeliveringData({ auth }));
        dispatch(getAllUsers({ auth }));
    }, [dispatch, auth]);

    const [viewData, setViewData] = useState(true);

    let dataSource = delivery.incoming.map((param) => {
        let status = 'Not received';
        if (param.received === true) {
            status = 'Received';
        }
        return {
            id: param.id,
            from: user.users[param.from - 1]?.name,
            to: user.users[param.to - 1]?.name,
            status: status,
            type: param.type,
        };
    });
    if (viewData === false) {
        dataSource = delivery.delivering.map((param) => {
            let status = 'Not received';
            if (param.received === true) {
                status = 'Received';
            }
            return {
                id: param.id,
                from: user.users[param.from - 1]?.name,
                to: user.users[param.to - 1]?.name,
                status: status,
                type: param.type,
            };
        });
    }

    const changeView = (checked) => {
        setViewData(checked);
    };

    const handleReceive = () => {};

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Delivery from',
            dataIndex: 'from',
            key: 'from',
        },
        {
            title: 'Delivery to',
            dataIndex: 'to',
            key: 'to',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <div>
                    {viewData && record.status === 'Not received' && (
                        <AiOutlineFileDone
                            onClick={handleReceive(record.id)}
                            className="mr-4 h-6 w-6 text-color4 hover:text-color2 hover:cursor-pointer"
                        />
                    )}
                </div>
            ),
        },
    ];

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
                            onChange={changeView}
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        bordered={true}
                        //onChange={handleTableChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default pending;
