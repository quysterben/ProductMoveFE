const { default: Navbar } = require('~/components/Navbar');
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Select, Table } from 'antd';
import { AiOutlineBarChart, AiOutlineTable } from 'react-icons/ai';
import { Chart } from 'chart.js/auto';
import autocolors from 'chartjs-plugin-autocolors';
import { getProductsData } from '~/redux/actions/productAction';
import { getDeliveringData } from '~/redux/actions/deliveryAction';
import { getLogistic } from '~/redux/actions/logisticsActions';
import { data } from 'autoprefixer';
import { getLotData } from '~/redux/actions/lotAction';

const statistics = () => {
    const { auth, product, delivery, logistics, lot } = useSelector((state) => state);
    const dispatch = useDispatch();
    Chart.register(autocolors);
    const [myChart1, setMyChart1] = useState();
    const [myChart2, setMyChart2] = useState();
    const [myChart3, setMyChart3] = useState();
    const [myChart4, setMyChart4] = useState();
    const [myChart5, setMyChart5] = useState();
    const router = useRouter();
    const chart1 = useRef('');
    const chart2 = useRef('');
    const chart3 = useRef('');
    const chart4 = useRef('');
    const chart5 = useRef('');
    const [columns, setColumns] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const allProducts = product.products;
    const deliveredLots = []
    const allLogistics = []

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn !== 'true') {
            router.push('/login');
        }
        dispatch(getProductsData({ auth }));
        dispatch(getDeliveringData({ auth }));
        // deliverLot()
    }, [dispatch, auth]);
    
    const [statistic, setStatistic] = useState('');
    const handleSelectChange = (value) => {
        setStatistic(value);
    };

    const [tableStatistic, setTableStatistic] = useState(false);

    function changeToChart(eventClick) {
        eventClick.currentTarget.classList.add('bg-info/20');
        eventClick.currentTarget.nextElementSibling.classList.remove('bg-info/20');
        setTableStatistic(false);
    }

    function changeToTable(eventClick) {
        eventClick.currentTarget.classList.add('bg-info/20');
        eventClick.currentTarget.previousElementSibling.classList.remove('bg-info/20');
        setTableStatistic(true);
    }

    useEffect(() => {
        resetCharts();
        doStatistic(statistic);
    }, [statistic]);

    useEffect(() => {
        if (statistic !== '') {
            if (tableStatistic) {
                doStatistic(statistic);
            } else {
                resetCharts();
                doStatistic(statistic);
            }
        }
    }, [tableStatistic]);
    


    function doStatistic(value) {
        switch (value) {
            case 'Products Manufactured':
                showProductsManufactured();
                break;
            case 'Products By Status':
                productByStatus();
        }
    }

    function resetCharts() {
        if (myChart1 !== undefined) {
            if (myChart1.ctx !== null) {
                myChart1.destroy();
            }
        }
        if (myChart2 !== undefined) {
            if (myChart2.ctx !== null) {
                myChart2.destroy();
            }
        }
        if (myChart3 !== undefined) {
            if (myChart3.ctx !== null) {
                myChart3.destroy();
            }
        }
        if (myChart4 !== undefined) {
            if (myChart4.ctx !== null) {
                myChart4.destroy();
            }
        }
    }
    
    // <------------Products Manufatured------------------>
    const showProductsManufactured = () => {
        const models = allProducts
            .map((param) => {
                return { model: param.model, product_line: param.product_line };
            })
            .filter(
                (value, index, self) => index === self.findIndex((t) => t.model === value.model),
            );
        const productsByModel = models.map((m) => {
            return {
                model: m.model,
                product_line: m.product_line,
                quantity: allProducts.filter((p) => p.model === m.model).length,
            };
        });
        const productLines = allProducts
            .map((param) => param.product_line)
            .filter((item, pos, self) => self.indexOf(item) === pos);

        const productsByProductLine = productLines.map((param) => {
            return {
                product_line: param,
                quantity: allProducts.filter((p) => p.product_line === param).length,
            };
        });

        if (tableStatistic) {
            const columns = [
                {
                    title: 'Model',
                    key: 'model',
                    dataIndex: 'model',
                },
                {
                    title: 'Product Line',
                    key: 'Product Line',
                    dataIndex: 'product_line',
                },
                {
                    title: 'Quantity',
                    key: 'quantity',
                    dataIndex: 'quantity',
                },
            ];
            const tableData = [];
            for (let i = 0; i < productsByModel.length; i++) {
                tableData.push({
                    model: productsByModel[i].model,
                    product_line: productsByModel[i].product_line,
                    quantity: productsByModel[i].quantity,
                });
            }
            setColumns(columns);
            setDataSource(tableData);
        } else {
            setMyChart1(
                new Chart(chart1.current, {
                    type: 'pie',
                    data: {
                        labels: productsByProductLine.map((p) => p.product_line),
                        datasets: [
                            {
                                label: 'Percentage of Each Product line',
                                data: productsByProductLine.map((p) => p.quantity),
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 205, 86, 0.2)',
                                ],
                                borderColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(255, 159, 64)',
                                    'rgb(255, 205, 86)',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    },
                }),
            );
            setMyChart2(
                new Chart(chart2.current, {
                    type: 'bar',
                    data: {
                        labels: productsByModel.map((p) => p.model),
                        datasets: [
                            {
                                label: 'Quantity of all Model',
                                data: productsByModel.map((p) => p.quantity),
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            autocolors: {
                                mode: 'data',
                            },
                        },
                    },
                }),
            );
        }
    };

    // <------------Product by status------------------>
    // allProduct: product in storage
    // deliveredProduct: product delivered
    // returnedProduct: product returned
    const productByStatus = () => {
        const secondHalf = delivery.delivering
        console.log(secondHalf)

        if (tableStatistic) {
            const columns = [
                {
                    title: 'Model',
                    key: 'model',
                    dataIndex: 'model',
                },
                {
                    title: 'Product Line',
                    key: 'Product Line',
                    dataIndex: 'product_line',
                },
                {
                    title: 'Quantity',
                    key: 'quantity',
                    dataIndex: 'amount',
                },
            ];
            setColumns(columns)
            setDataSource(secondHalf)
        } else {
            setMyChart1(
                new Chart(chart1.current, {
                    type: 'pie',
                    data: {
                        labels: secondHalf.map((p) => p.model),
                        datasets: [
                            {
                                label: 'Percentage of Each Product model delivered',
                                data: secondHalf.map((p) => p.amount),
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            autocolors: {
                                mode: 'data',
                            },
                        },
                    },
                }),
            );
            setMyChart2(
                new Chart(chart2.current, {
                    type: 'bar',
                    data: {
                        labels: secondHalf.map((p) => p.model),
                        datasets: [
                            {
                                label: 'Quantity of all Model',
                                data: secondHalf.map((p) => p.amount),
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            autocolors: {
                                mode: 'data',
                            },
                        },
                    },
                }),
            );
        }
 
    }
    

    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-[88px] px-16">
                <div className="flex justify-between">
                    <h2 className="font-bold">Production Statistics</h2>
                    <Select onChange={handleSelectChange} placeholder="Select Statistic" allowClear>
                        <Select.Option value="Products Manufactured">
                            Products Manufactured
                        </Select.Option>
                        <Select.Option value="Products By Status">Products By Status</Select.Option>
                    </Select>
                </div>

                <div className="select-statistic w-full text-right my-4">
                    <AiOutlineBarChart
                        className="text-2xl mx-2 bg-info/20 cursor-pointer"
                        onClick={changeToChart}
                    />
                    <AiOutlineTable
                        className="text-2xl mx-2 cursor-pointer"
                        onClick={changeToTable}
                    />
                </div>

                <div className="">
                    {tableStatistic ? (
                        <div className="table w-full">
                            <Table
                                columns={columns}
                                dataSource={dataSource}
                                bordered={true}
                                // onChange={handleTableChange}
                                pagination={false}
                            />
                        </div>
                    ) : (
                        <div className="chart flex justify-center items-center flex-wrap">
                            <div className="chart-container w-500 my-5 mx-5">
                                <canvas ref={chart1} id="chart1"></canvas>
                            </div>
                            <div className="chart-container w-500 my-5 mx-5">
                                <canvas ref={chart2} id="chart2"></canvas>
                            </div>
                            <div className="chart-container w-500 my-5 mx-5">
                                <canvas ref={chart3} id="chart3"></canvas>
                            </div>
                            <div className="chart-container w-500 my-5 mx-5">
                                <canvas ref={chart4} id="chart4"></canvas>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default statistics;
