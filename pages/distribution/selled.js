import Navbar from '~/components/Navbar';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Button, Table, Modal, Form, Input, Select, Checkbox } from 'antd';
import { MdErrorOutline } from 'react-icons/md';
import { getSelledProducts, sellProduct } from '~/redux/actions/productAction';
import { createNewCustomer, getAllCustomers } from '~/redux/actions/customerAction';
import { getAllStorages } from '~/redux/actions/storageAction';

const selled = () => {
    const { auth, product, customer, storage } = useSelector((state) => state);
    const dispatch = useDispatch();
    const router = useRouter();

    const [filteredInfo, setFilteredInfo] = useState({});
    const handleTableChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
    };

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn !== 'true') {
            router.push('/login');
        }
        dispatch(getSelledProducts({ auth }));
        dispatch(getAllCustomers({ auth }));
        dispatch(getAllStorages({ auth }));
    }, [dispatch, auth]);

    const convertStatus = (status) => {
        switch (status) {
            case 1:
                return 'New product';
            case 2:
                return 'On sale';
            case 3:
                return 'Sold';
            case 4:
                return 'Repair in waiting';
            case 5:
                return 'Repairing';
            case 6:
                return 'Repaired';
            case 7:
                return 'Recalling';
            case 8:
                return 'Recalled';
            case 9:
                return 'Returned';
            default:
                return 'Shipping';
        }
    };

    const dataSource = product.selled_products?.map((data) => {
        const s = convertStatus(data.status);
        return {
            id: data.id,
            status: s,
            customer: customer.customers[data.customer_id - 1]?.email,
            product_line: data.product_line,
            model: data.model,
            sale_date: data.sale_date,
        };
    });

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Product Line',
            dataIndex: 'product_line',
            key: 'product_line',
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Sale Date',
            dataIndex: 'sale_date',
            key: 'sale_date',
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
                    {record.status === 'Sold' && (
                        <MdErrorOutline
                            className="mr-4 h-6 w-6 text-color4 hover:text-color2 hover:cursor-pointer"
                            onClick={() => handleShowModal(record.id)}
                        />
                    )}
                </div>
            ),
        },
    ];

    //Sell modal
    const [isSellModalOpen, setIsSellModalOpen] = useState(false);
    const [productId, setProductId] = useState();
    const [storageData, setStorageData] = useState('');

    const handleShowModal = (id) => {
        setProductId(id);
        setIsSellModalOpen(true);
    };

    const handleOk = () => {
        if (true) {
            const data = {
                product_id: productId,
                storage_id: storageData,
            };
            console.log(data);
        }
        //router.reload();
        setIsSellModalOpen(false);
    };

    const handleCancel = () => {
        setIsSellModalOpen(false);
    };

    const handleChangeStorage = (value) => {
        setStorageData(value);
    };

    return (
        <div>
            <Navbar></Navbar>
            <Modal
                title="Product Recall"
                visible={isSellModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
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
                    <h2 className="font-bold">Selled Product Manegement</h2>
                    <div>
                        <Button
                            className="mr-6 bg-color3 border-color1 hover:bg-color2 hover:text-color1"
                            type="primary"
                        >
                            Export Excel
                        </Button>
                    </div>
                </div>
                <div className="mt-6">
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        bordered={true}
                        onChange={handleTableChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default selled;
