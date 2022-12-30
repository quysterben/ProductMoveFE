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
import { getSelledProducts } from '~/redux/actions/productAction';
import { data } from 'autoprefixer';

const statistics = () => {
    const { auth, product, delivery } = useSelector((state) => state);
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
    const soldProducts = product.selled_products;

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn !== 'true') {
            router.push('/login');
        }
        dispatch(getProductsData({ auth }));
        dispatch(getDeliveringData({ auth }));
        dispatch(getSelledProducts({ auth }));
    }, [dispatch, auth]);

    const [statistic, setStatistic] = useState('');
    // console.log(product)
    // console.log(allProducts)
    // console.log(soldProducts)

    const handleSelectChange = (value) => {
        setStatistic(value);
    };

    const [filteredInfo, setFilteredInfo] = useState({});
    const handleTableChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
    };
    useEffect(() => {
        console.log(filteredInfo);
        doStatistic(statistic);
    }, [filteredInfo]);

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
            case 'Products in storage':
                showProductsInStorage();
                break;
            case 'Product by status':
                productByStatus();
                break;
            case 'Statistic sold products':
                statisticSoldProduct();
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
    const showProductsInStorage = () => {
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
                    key: 'product_line',
                    dataIndex: 'product_line',
                    filters: [
                        {
                            text: 'iphone',
                            value: 'iphone',
                        },
                        {
                            text: 'ipad',
                            value: 'ipad',
                        },
                        {
                            text: 'macintosh',
                            value: 'macintosh',
                        },
                    ],
                    filteredValue: filteredInfo.product_line || null,
                    onFilter: (value, record) => record.product_line === value,
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

    const concatProducts = allProducts.concat(soldProducts);
    // <------------Statistics sold product------------------>
    // allProduct: product in storage
    // deliveredProduct: product delivered
    // returnedProduct: product returned
    const statisticSoldProduct = () => {
        // console.log(concatProducts)
        const models = concatProducts
            .map((param) => {
                return { model: param.model, product_line: param.product_line };
            })
            .filter(
                (value, index, self) => index === self.findIndex((t) => t.model === value.model),
            );
        console.log(models);
        const soldData = models.map((m => {
            return {
                model: m.model,
                product_line: m.product_line,
                quantity: concatProducts.filter((p) => p.model === m.model && p.status === 3 ).length
            }
        }))
        console.log(soldData)
        if (tableStatistic) {
            const columns = [
                {
                    title: 'Model',
                    key: 'model',
                    dataIndex: 'model',
                },
                {
                    title: 'Product_line',
                    key: 'product_line',
                    dataIndex: 'product_line',
                },
                {
                    title: 'Quantity Sold',
                    key: 'quantity',
                    dataIndex: 'quantity',
                    sorter: (a, b) => a.quantity - b.quantity
                },
                {
                    title: 'Quantity Remain',
                    key: 'remain',
                    dataIndex: 'remain',
                },
                
            ]
            const tableData = []
            for (let i = 0; i < soldData.length; i++) {
                tableData.push({
                    model: soldData[i].model,
                    product_line: soldData[i].product_line,
                    quantity: soldData[i].quantity,
                    remain: concatProducts.filter(p => p.model === soldData[i].model && p.status !== 3).length - soldData.length
                })
            }
            setColumns(columns)
            setDataSource(tableData)
        } else {
            // console.log(soldData.map(m => m.model))
            // console.log(soldData.map(m => m.quantity))
            setMyChart1(
                new Chart(chart1.current, {
                    type: 'pie',
                    data: {
                        labels: soldData.map(m => m.model),
                        datasets: [
                            {
                                label: 'Percentage of Each Product sold',
                                data: soldData.map(m => m.quantity),
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
                        labels: soldData.map(m => m.model),
                        datasets: [
                            {
                                label: 'Quantity of each model sold',
                                data: soldData.map(m => m.quantity),
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

    // <------------Status------------------>


    const productByStatus = () => {
        console.log(allProducts)
        console.log(soldProducts)
        const conProducts = allProducts.concat(soldProducts.filter(p => p.status === 3))
        const models = conProducts
            .map((param) => param.model)
            .filter((item, pos, self) => self.indexOf(item) === pos);
        let allStatus = [];
        for (let i = 0; i < models.length; i++) {
            //model: models[i]
            // console.log(i)
            let newObject = {
                name: models[i],
                status: [],
            };
            const total = conProducts.filter((p) => p.model === models[i]).length;
            for (let j = 0; j < 10; j++) {
                let count = 0;
                count = conProducts.filter((p) => p.status === j && p.model === models[i]).length;
                // console.log(count)
                newObject.status.push({
                    status: convertStatus(j),
                    count: count,
                    percentInAllModel: Math.round((count / total) * 100),
                });
            }
            allStatus.push(newObject);
            // console.log(allStatus)
        }
        let tableData;
        if (!tableStatistic) {
            let datasets = [];
            for (let i = 0; i < 10; i++) {
                datasets.push({
                    label: allStatus[1].status[i].status,
                    backgroundColor: indexToColor(i),
                    data: allStatus.map((e) => e.status[i].percentInAllModel),
                });
            }
            const chartData = {
                type: 'bar',
                data: {
                    labels: models,
                    datasets: datasets,
                },
                options: {
                    tooltipss: {
                        enable: true,
                        mode: 'single',
                        callbacks: {
                            label: function (tooltipItems, data) {
                                return (
                                    data.datasets[tooltipItems.datasetIndex].label +
                                    ': ' +
                                    data.datasets[tooltipItems.datasetIndex].data +
                                    ' %'
                                );
                            },
                        },
                    },
                    resoponsive: true,
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true
                        }                        
                    }
                },
            };
            setMyChart1(new Chart(chart1.current, chartData));
        } else {
            const filterModel = models.map((e) => {
                return { value: e, text: e };
            });
            const columns = [
                {
                    title: 'Model',
                    dataIndex: 'model',
                    filters: filterModel,
                    filteredValue: filteredInfo.model || null,
                    onFilter: (value, record) => record.model === value,
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    filters: [
                        {
                            text: 'Shipping',
                            value: 'Shipping',
                        },
                        {
                            text: 'New product',
                            value: 'New product',
                        },
                        {
                            text: 'On Sale',
                            value: 'On Sale',
                        },
                        {
                            text: 'Sold',
                            value: 'Sold',
                        },
                        {
                            text: 'Repair in waiting',
                            value: 'Repair in waiting',
                        },
                        {
                            text: 'Repairing',
                            value: 'Repairing',
                        },
                        {
                            text: 'Repaired',
                            value: 'Repaired',
                        },
                        {
                            text: 'Recalling',
                            value: 'Recalling',
                        },
                        {
                            text: 'Recalled',
                            value: 'Recalled',
                        },
                        {
                            text: 'Returned',
                            value: 'Returned',
                        },
                    ],
                    filteredValue: filteredInfo.status || null,
                    onFilter: (value, record) => record.status === value,
                },
                {
                    title: 'Quantity',
                    dataIndex: 'count',
                },
                {
                    title: 'Percentage in Model',
                    dataIndex: 'percentInAllModel',
                },
            ];
            const tableData = [];
            for (let i = 0; i < models.length; i++) {
                for (let j = 0; j < 10; j++) {
                    if (allStatus[i].status[j].count !== 0) {
                        tableData.push({
                            model: models[i],
                            status: allStatus[i].status[j].status,
                            count: allStatus[i].status[j].count,
                            percentInAllModel: allStatus[i].status[j].percentInAllModel + '%',
                        });
                    }
                }
            }
            setColumns(columns);
            setDataSource(tableData);
        }
    };

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

    const indexToColor = (index) => {
        switch (index) {
            case 1:
                return 'rgba(245, 39, 195, 0.8)';
            case 2:
                return 'rgba(240, 195, 39, 0.8)';
            case 3:
                return 'rgba(178, 39, 245, 0.8)';
            case 4:
                return 'rgba(39, 145, 245, 0.8)';
            case 5:
                return 'rgba(245, 39, 106, 0.8)';
            case 6:
                return 'rgba(39, 67, 245, 0.8)';
            case 7:
                return 'rgba(39, 175, 245, 0.8)';
            case 8:
                return 'rgba(243, 245, 39, 0.8)';
            case 9:
                return 'rgba(245, 39, 39, 0.9)';
            default:
                return 'rgba(49, 39, 245, 0.9)';
        }
    };
    

    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-[88px] px-16">
                <div className="flex justify-between">
                    <h2 className="font-bold">Distribution Statistics</h2>
                    <Select onChange={handleSelectChange} placeholder="Select Statistic" allowClear>
                        <Select.Option value="Products in storage">
                            Products in storage
                        </Select.Option>
                        <Select.Option value="Statistic sold products">
                            Statistic sold products
                        </Select.Option>
                        <Select.Option value="Product by status">Product by status</Select.Option>
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
                                onChange={handleTableChange}
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
