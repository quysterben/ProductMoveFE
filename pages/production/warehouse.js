import Navbar from '~/components/Navbar';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Button, Table, Modal, Form, Input, Select } from 'antd';
import { CiDeliveryTruck } from 'react-icons/ci';
import { deliveryLot, getLotData, procedureLot } from '~/redux/actions/lotAction';
import { getProductsData } from '~/redux/actions/productAction';
import { getAllModels } from '~/redux/actions/modelActions';
import { getAllStorages } from '~/redux/actions/storageAction';
import { getAllUsers } from '~/redux/actions/userAction';

const warehouse = () => {
    const { auth, lot, product, model, storage, user, deliveredlot } = useSelector((state) => state);
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
        dispatch(getProductsData({ auth }));
        dispatch(getAllModels({ auth }));
        dispatch(getAllStorages({ auth }));
        dispatch(getAllUsers({ auth }));
    }, [dispatch, auth]);

    const convertStatus = (status) => {
        switch (status) {
            case 1: 
                return 'New product'
            case 2: 
                return 'On sale'
            case 3: 
                return 'Sold'
            case 4: 
                return 'Repair in waiting'
            case 5: 
                return 'Repairing'
            case 6: 
                return 'Repaired'
            case 7: 
                return 'Recalling'
            case 8: 
                return 'Recalled'
            case 9: 
                return 'Returned'
            default: 
                return 'Shipping'
        }
    }

    const dataSource = product.products.map(data => {
        const s = convertStatus(data.status)
        return {
            ...data,
            status: s
        }
    });
    const lotsData = product.products
        .map((param) => param.lot_number)
        .filter((e, i, a) => a.indexOf(e) === i);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Lot Number',
            dataIndex: 'lot_number',
            key: 'lot_number',
            filters: lotsData.map((param) => {
                return {
                    text: param,
                    value: param,
                };
            }),
            filteredValue: filteredInfo.lot_number || null,
            onFilter: (value, record) => record.lot_number === value,
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
            title: 'Manufacturing Date',
            dataIndex: 'manufacturing_date',
            key: 'manufacturing_date',
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
                    <CiDeliveryTruck
                        className="mr-4 h-6 w-6 text-color4 hover:text-color2 hover:cursor-pointer"
                        onClick={() => handleShowDeliveryModel(record.lot_number)}
                    >
                        Delivery
                    </CiDeliveryTruck>
                </div>
            ),
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const amountData = useRef();
    const [modelData, setModelData] = useState('');
    const [storageData, setStorageData] = useState('');

    const handleChangeModel = (value) => {
        setModelData(value);
    };

    const handleChangeStorage = (value) => {
        setStorageData(value);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleOk = () => {
        if (validate()) {
            const data = {
                amount: parseInt(amountData.current.input.value),
                model: modelData,
                storage_id: storageData,
            };
            dispatch(procedureLot({ auth, data }));
            setIsModalOpen(false);
            router.reload();
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setModelData('');
        setStorageData('');
    };

    const validate = () => {
        let check = true;
        if (amountData.current.input.value === '') {
            amountData.current.input.setAttribute('class', 'ant-input ant-input-status-error');
            check = false;
        } else {
            amountData.current.input.setAttribute('class', 'ant-input');
        }

        if (modelData === '' || modelData === undefined) {
            check = false;
        }

        if (storageData === '' || storageData === undefined) {
            check = false;
        }

        return check;
    };

    //Delivery modal
    const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
    const [storeData, setStoreData] = useState('');

    const handleShowDeliveryModel = (value) => {
        dispatch(getLotData({ auth, data: value }));
        setIsDeliveryModalOpen(true);
    };

    const handleDeliveryModalOk = () => {
        if (true) {
            const data = {
                lot_number: lot.lot[0]?.id,
                to: storeData,
            };
            dispatch(deliveryLot({ auth, data }));
            setIsDeliveryModalOpen(false);
            router.reload();
        }
    };

    const handleDeliveryModalCancel = () => {
        setIsDeliveryModalOpen(false);
    };

    const handleChangeStore = (value) => {
        setStoreData(value);
    };

    return (
        <div>
            <Navbar></Navbar>
            <Modal
                title="User Infomation"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    name="productdata"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                >
                    <Form.Item label="amount" name="Amount">
                        <Input ref={amountData} />
                    </Form.Item>

                    <Form.Item name="model" label="Model">
                        <Select placeholder="Select model" onChange={handleChangeModel} allowClear>
                            {model.models.map((param) => (
                                <Option value={param.id}>{param.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="storage" label="Storage">
                        <Select
                            placeholder="Select storage"
                            onChange={handleChangeStorage}
                            allowClear
                        >
                            {storage.storages.map((param) => (
                                <Option value={param.id}>{param.location}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Delivery To Distribution"
                visible={isDeliveryModalOpen}
                onOk={handleDeliveryModalOk}
                onCancel={handleDeliveryModalCancel}
            >
                <Form
                    name="deliveryData"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                >
                    <Form.Item label="id" name="Lot Id">
                        <Input disabled placeholder={lot.lot[0]?.id} />
                    </Form.Item>
                    <Form.Item label="model" name="Model">
                        <Input disabled placeholder={lot.lot[0]?.model} />
                    </Form.Item>
                    <Form.Item label="amount" name="Amount">
                        <Input disabled placeholder={lot.lot[0]?.amount} />
                    </Form.Item>
                    <Form.Item name="Store" label="To Store">
                        <Select placeholder="Select store" onChange={handleChangeStore} allowClear>
                            {user.users.map(
                                (param) =>
                                    param.role === 'distribution' && (
                                        <Option value={param.id}>{param.name} </Option>
                                    ),
                            )}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <div className="pt-[88px] px-16">
                <div className="flex justify-between">
                    <h2 className="font-bold">Products Manegement</h2>
                    <div>
                        <Button
                            className="mr-6 bg-color3 border-color1 hover:bg-color2 hover:text-color1"
                            type="primary"
                        >
                            Export Excel
                        </Button>
                        <Button
                            className="bg-color3 border-color1 hover:bg-color2 hover:text-color1"
                            type="primary"
                            onClick={() => showModal()}
                        >
                            Add Products
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

export default warehouse;
