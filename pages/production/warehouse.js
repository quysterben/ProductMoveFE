import Navbar from '~/components/Navbar';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Button, Table, Modal, Form, Input, Select } from 'antd';
import { CiDeliveryTruck } from 'react-icons/ci';
import { getLotData } from '~/redux/actions/lotAction';
import { getProductsData } from '~/redux/actions/productAction';
import { getAllModels } from '~/redux/actions/modelActions';

const warehouse = () => {
    const { auth, lot, product, model } = useSelector((state) => state);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn !== 'true') {
            router.push('/login');
        }
        dispatch(getProductsData({ auth }));
        dispatch(getAllModels({ auth }));
    }, [dispatch, auth]);

    const dataSource = product.products?.map((param) => {
        const currentDate = new Date(param.createdAt);
        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const timestamp =
            currentDayOfMonth +
            '-' +
            (currentMonth + 1) +
            '-' +
            currentYear +
            ' ' +
            currentDate.toLocaleTimeString();

        return {
            id: param.id,
            lot_id: param.lot_number,
            product_line: 'iphone',
            model: 'iphone14',
            date: timestamp,
        };
    });

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Lot Id',
            dataIndex: 'lot_id',
            key: 'lot_id',
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
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <div>
                    <CiDeliveryTruck className="mr-4 h-6 w-6 text-color4 hover:text-color2 hover:cursor-pointer">
                        Delivery
                    </CiDeliveryTruck>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Navbar></Navbar>
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
                            //onClick={() => showModal()}
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
                        //onChange={handleTableChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default warehouse;
