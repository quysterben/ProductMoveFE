import Navbar from '~/components/Navbar';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { getDeliveringData, getIncomingData } from '~/redux/actions/deliveryAction';
import { Button, Table, Modal, Form, Input, Select, Switch } from 'antd';
import { getAllUsers } from '~/redux/actions/userAction';

import { AiOutlineFileDone } from 'react-icons/ai';
import { receiveLot } from '~/redux/actions/lotAction';
import { receiveProduct } from '~/redux/actions/productAction';
import { getAllStorages } from '~/redux/actions/storageAction';

const pending = () => {
    const { auth, delivery, user, storage } = useSelector((state) => state);
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
        dispatch(getAllStorages({ auth }));
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
                            onClick={() => handleShowReceivedModal(record.id)}
                            className="mr-4 h-6 w-6 text-color4 hover:text-color2 hover:cursor-pointer"
                        />
                    )}
                </div>
            ),
        },
    ];

    //Received modal
    const [isReceivedModalOpen, setIsReceivedModalOpen] = useState(false);
    const [storageData, setStorageData] = useState('');
    const [deliveryId, setDeliveryId] = useState('');

    const handleShowReceivedModal = (value) => {
        setIsReceivedModalOpen(true);
        setDeliveryId(value);
    };

    const handleReceivedModalOk = () => {
        if (true) {
            const data = {
                delivery_id: deliveryId,
                storage_id: storageData,
            };
            dispatch(receiveLot({ auth, data }));
            setIsReceivedModalOpen(false);
            router.reload();
        }
    };

    const handleReceivedModalCancel = () => {
        setIsReceivedModalOpen(false);
    };

    const handleChangeStorage = (value) => {
        setStorageData(value);
    };

    return (
        <div>
            <Navbar />
            <Modal
                title="Delivery To Distribution"
                visible={isReceivedModalOpen}
                onOk={handleReceivedModalOk}
                onCancel={handleReceivedModalCancel}
            >
                <Form
                    name="Storage"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                >
                    <Form.Item name="storage" label="To storage">
                        <Select
                            placeholder="Select storage"
                            onChange={handleChangeStorage}
                            allowClear
                        >
                            {storage.storages.map((param) => (
                                <Option value={param.id}>{param.location} </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
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
