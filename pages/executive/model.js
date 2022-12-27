const { default: Navbar } = require('~/components/Navbar');
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { createModel, getAllModels } from '~/redux/actions/modelActions';
import { Table, Button, Modal, Form, Input, Select } from 'antd';


const model = () => {
    const router = useRouter();
    const {auth, model} = useSelector((state) => state)
    const dispatch = useDispatch()
    const [isModalOpen, setModalOpen] = useState(false)

    const nameData = useRef('')
    const [productLineData, setProductLineData] = useState('')

    const [filteredInfo, setFilteredInfo] = useState({})
    
    const handleTableChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters)
    }

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn !== 'true') {
            router.push('/login');
        }
        dispatch(getAllModels({auth}))
    }, [dispatch, auth]);

    const dataSource = model.models
    // console.log(dataSource)

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Product line',
            dataIndex: 'product_line',
            key: 'product_line',
            filters: [
                {
                    text: 'iphone',
                    value: 'iphone'
                },
                {
                    text: 'ipad',
                    value: 'ipad'
                },
                {
                    text: 'macintosh',
                    value: 'macintosh'
                },
            ],
            filteredValue: filteredInfo.product_line || null,
            onFilter: (value, record) => record.product_line.includes(value),
            // ellipsis: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }
    ]

    const handleOk = () => {        
        if (validateAddModel()) {
            const data = {
                product_line: productLineData,
                name: nameData.current.input.value
            }
            dispatch(createModel({data, auth}))
            setModalOpen(false)
            setProductLineData('')
            router.reload()
        }
    }

    const handleCancel = () => {
        setModalOpen(false)
        setProductLineData('')
    }
    
    const  validateAddModel = () => {
        let check = true;
        if (nameData.current.input.value === '') {
            nameData.current.input.parentElementsetAttribute('class', 'ant-input ant-input-status-error');
            check = false
        }
        if (productLineData === '') {
            check = false
        }
        
        return check
    }

    const handleSelectChange = (value) => {
        setProductLineData(value)
    }


    const showModal = () => {
        setModalOpen(true)
    }

    return (
        <div>
            <Navbar></Navbar>
            <Modal
                title="Model Information"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    name="modeldata"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                >
                    <Form.Item label="Product Line" name='productLine'>
                        <Select onChange={handleSelectChange} placeholder='Select Product line' allowClear>
                            <Select.Option value='iphone'>iphone</Select.Option>
                            <Select.Option value='ipad'>ipad</Select.Option>
                            <Select.Option value='macintosh'>macintosh</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Name" name="name">
                        <Input ref={nameData} />
                    </Form.Item>
                </Form>
            </Modal>
            <div className='pt-[88px] main px-16'>
                <div className="flex justify-between">
                    <h2 className="font-bold">Models</h2>
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
                            Add model
                        </Button>
                    </div>
                </div>
                <div className='mt-6'>
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

export default model;
