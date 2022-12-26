import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '~/components/Navbar';
import { getAllUsers } from '~/redux/actions/userAction';
import { useRouter } from 'next/router';

import { Button, Table, Modal } from 'antd';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const manegement = () => {
    const { auth, user } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers({ auth }));
    }, [dispatch, auth, router]);

    const dataSource = user.users;

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <div>
                    <AiFillEdit className="mr-4 h-6 w-6 text-color4 hover:text-color2 hover:cursor-pointer">
                        Edit
                    </AiFillEdit>
                    <AiFillDelete className="h-6 w-6 text-color4 hover:text-color2 hover:cursor-pointer">
                        Delete
                    </AiFillDelete>
                </div>
            ),
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <div className="pt-[88px] px-16">
                <div className="flex justify-between">
                    <h2 className="font-bold">Staff Manegement</h2>
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
                            onClick={() => showModal()}
                        >
                            Add user
                        </Button>
                    </div>
                </div>
                <div className="mt-6">
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        bordered={true}
                    />
                    ;
                </div>
            </div>
        </div>
    );
};

export default manegement;
