import Navbar from '~/components/Navbar';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Button, Table, Modal, Form, Input, Select, Checkbox } from 'antd';
import { TiShoppingCart } from 'react-icons/ti';
import { CiDeliveryTruck } from 'react-icons/ci';
import { GiReturnArrow } from 'react-icons/gi';
import {
    getProductsData,
    returnProductToCustomer,
    sellProduct,
} from '~/redux/actions/productAction';
import { getAllModels } from '~/redux/actions/modelActions';
import { getAllStorages } from '~/redux/actions/storageAction';
import { getAllUsers } from '~/redux/actions/userAction';
import { createNewCustomerAndSell, getAllCustomers } from '~/redux/actions/customerAction';
import { deliveryLot } from '~/redux/actions/lotAction';

const warehouse = () => {
    const { auth, lot, product, model, storage, user, customer } = useSelector((state) => state);
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
        dispatch(getAllCustomers({ auth }));
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

    const dataSource = product.products?.map((data) => {
        const s = convertStatus(data.status);
        return {
            ...data,
            status: s,
        };
    });
    const lotsData = product.products
        ?.map((param) => param.lot_number)
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
                    {record.status === 'Repair in waiting' ? (
                        <CiDeliveryTruck
                            className="mr-4 h-6 w-6 text-color4 hover:text-color2 hover:cursor-pointer"
                            onClick={() => handleShowDeliveryModel(record.id)}
                        />
                    ) : record.status === 'Repaired' ? (
                        <GiReturnArrow
                            className="mr-4 h-6 w-6 text-color4 hover:text-color2 hover:cursor-pointer"
                            onClick={() => handleReturnToCustomer(record.id)}
                        />
                    ) : (
                        <TiShoppingCart
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
    const customerEmail = useRef('');
    const [customerId, setCustomerId] = useState('');
    const [productId, setProductId] = useState();

    const [componentDisabled, setComponentDisabled] = useState(true);

    const handleShowModal = (id) => {
        setProductId(id);
        setIsSellModalOpen(true);
    };

    const handleChangeModel = (value) => {
        setCustomerId(value);
    };

    const handleOk = () => {
        if (componentDisabled === false) {
            const data = {
                product_id: productId,
                customer_id: customerId,
            };
            dispatch(sellProduct({ auth, data }));
        } else {
            const data = { email: customerEmail.current.input.value };
            dispatch(createNewCustomerAndSell({ auth, data, product_id: productId }));
        }
        router.push('sold');
        setIsSellModalOpen(false);
    };

    const handleCancel = () => {
        setIsSellModalOpen(false);
    };

    //Delivery modal
    const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
    const [warrantyData, setWarrantyData] = useState('');

    const handleShowDeliveryModel = (value) => {
        setProductId(value);
        setIsDeliveryModalOpen(true);
    };

    const handleDeliveryModalOk = () => {
        if (true) {
            const data = {
                product_id: productId,
                to: warrantyData,
            };
            dispatch(deliveryLot({ auth, data }));
            setIsDeliveryModalOpen(false);
            router.push('pending');
        }
    };

    const handleDeliveryModalCancel = () => {
        setIsDeliveryModalOpen(false);
    };

    const handleChangeWarrantyData = (value) => {
        setWarrantyData(value);
    };

    //return to customer
    const handleReturnToCustomer = (id) => {
        const data = {
            product_id: id,
        };
        router.push('sold');
        dispatch(returnProductToCustomer({ auth, data }));
    };

    return (
        <div>
            <Navbar></Navbar>
            <Modal
                title="User Infomation"
                visible={isSellModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Checkbox
                    className="float-right"
                    checked={componentDisabled}
                    onChange={(e) => setComponentDisabled(e.target.checked)}
                >
                    Old customer
                </Checkbox>
                <Form
                    className="mt-14"
                    name="CustomerData"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    disabled={componentDisabled}
                >
                    <Form.Item name="customer" label="Customer">
                        <Select placeholder="Select" onChange={handleChangeModel} allowClear>
                            {customer.customers.map((param) => (
                                <Option value={param.id}>{param.email}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
                <Form
                    className="mt-10"
                    name="CustomerData"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    disabled={!componentDisabled}
                >
                    <Form.Item label="Email" name="Email">
                        <Input ref={customerEmail} />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Delivery To Warranty"
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
                    <Form.Item name="Store" label="To Warranty">
                        <Select
                            placeholder="Select warranty"
                            onChange={handleChangeWarrantyData}
                            allowClear
                        >
                            {user.users.map(
                                (param) =>
                                    param.role === 'warranty' && (
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
