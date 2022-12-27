import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '~/components/Navbar';
import { createUser, getAllUsers } from '~/redux/actions/userAction';
import { useRouter } from 'next/router';

import { Button, Table, Modal, Form, Input, Select } from 'antd';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const manegement = () => {
    const { auth, user } = useSelector((state) => state);
    const dispatch = useDispatch();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const emailData = useRef('');
    const usernameData = useRef('');
    const passData = useRef('');
    const cfPassData = useRef('');
    const [roleData, setRoleData] = useState('');

    const [filteredInfo, setFilteredInfo] = useState({})
    
    const handleTableChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters)
    }

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn !== 'true') {
            router.push('/login');
        }
        dispatch(getAllUsers({ auth }));
    }, [dispatch, auth]);

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
            filters: [
                {
                    text: 'Executive',
                    value: 'executive'
                },
                {
                    text: 'Production',
                    value: 'production'
                },
                {
                    text: 'Distribution',
                    value: 'distribution'
                },
                {
                    text: 'Warranty',
                    value: 'warranty'
                },
            ],
            filteredValue: filteredInfo.role || null,
            onFilter: (value, record) => record.role.includes(value),
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

    const handleChangeSelect = (value) => {
        setRoleData(value);
    };

    const validate = () => {
        let check = true;
        if (emailData.current.input.value === '') {
            emailData.current.input.setAttribute('class', 'ant-input ant-input-status-error');
            check = false;
        } else {
            emailData.current.input.setAttribute('class', 'ant-input');
        }

        if (usernameData.current.input.value === '') {
            usernameData.current.input.setAttribute('class', 'ant-input ant-input-status-error');
            check = false;
        } else {
            usernameData.current.input.setAttribute('class', 'ant-input');
        }

        if (passData.current.input.value === '') {
            passData.current.input.parentElement.setAttribute(
                'class',
                'ant-input-affix-wrapper ant-input-password ant-input-affix-wrapper-status-error',
            );
        }

        if (cfPassData.current.input.value === '' || cfPassData !== passData) {
            cfPassData.current.input.parentElement.setAttribute(
                'class',
                'ant-input-affix-wrapper ant-input-password ant-input-affix-wrapper-status-error',
            );
        }

        if (roleData === '' || roleData === undefined) {
            check = false;
        }
        return check;
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (validate()) {
            const data = {
                email: emailData.current.input.value,
                name: usernameData.current.input.value,
                password: passData.current.input.value,
                confirm: cfPassData.current.input.value,
                role: roleData,
            };

            dispatch(createUser({ data, auth }));

            setIsModalOpen(false);
            setRoleData('');
            router.reload();
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setRoleData('');
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
                    name="userdata"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                >
                    <Form.Item label="Email" name="email">
                        <Input ref={emailData} />
                        <div></div>
                    </Form.Item>

                    <Form.Item label="Username" name="username">
                        <Input ref={usernameData} />
                        <div></div>
                    </Form.Item>

                    <Form.Item label="Password" name="password">
                        <Input.Password ref={passData} />
                        <div></div>
                    </Form.Item>

                    <Form.Item label="Confirm password" name="cfPassword">
                        <Input.Password ref={cfPassData} />
                        <div></div>
                    </Form.Item>

                    <Form.Item name="role" label="Role">
                        <Select placeholder="Select role" onChange={handleChangeSelect} allowClear>
                            <Option value="production">production</Option>
                            <Option value="distribution">distribution</Option>
                            <Option value="warranty">warranty</Option>
                        </Select>
                    </Form.Item>
                </Form>
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
                        onChange={handleTableChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default manegement;
