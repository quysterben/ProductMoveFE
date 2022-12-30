const { default: Navbar } = require('~/components/Navbar');
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { Select, Table } from 'antd';
import { getAllModels } from '~/redux/actions/modelActions';
import { Chart } from 'chart.js/auto';
import { color } from 'chart.js/helpers';
import autocolors from 'chartjs-plugin-autocolors';
import { lots, products } from '~/testdata';
import { AiOutlineBarChart, AiOutlineTable } from 'react-icons/ai';
import { getProductsData } from '~/redux/actions/productAction';
import { getLotData } from '~/redux/actions/lotAction';
import { data } from 'autoprefixer';

const statistics = () => {
    const { auth, model, lot, product } = useSelector((state) => state);
    const dispatch = useDispatch();
    const router = useRouter();
    const [tableStatistic, setTableStatistic] = useState(false);
    const chart1 = useRef('');
    const chart2 = useRef('');
    const chart3 = useRef('');
    const chart4 = useRef('');
    const chart5 = useRef('');

    const [filteredInfo, setFilteredInfo] = useState({});

    const handleTableChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        // doStatistic(statistic)
        // console.log(filteredInfo)
    };

    useEffect(() => {
        console.log(filteredInfo)
        doStatistic(statistic);
    }, [filteredInfo]);

    const allLots = [];
    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn !== 'true') {
            router.push('/login');
        }
        dispatch(getAllModels({ auth }));
        dispatch(getProductsData({ auth }));
    }, [dispatch, auth]);

    const lotsData = product.products
        .map((param) => param.lot_number)
        .filter((item, pos, self) => self.indexOf(item) === pos);

    const allProducts = product.products;
    // console.log(allProducts)

    Chart.register(autocolors);
    const [myChart1, setMyChart1] = useState();
    const [myChart2, setMyChart2] = useState();
    const [myChart3, setMyChart3] = useState();
    const [myChart4, setMyChart4] = useState();
    const [myChart5, setMyChart5] = useState();

    const [columns, setColumns] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [statistic, setStatistic] = useState('');

    const handleSelectChange = (value) => {
        setStatistic(value);
    };

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

    // <------------Change statistics------------------>
    useEffect(() => {
        resetCharts();
        doStatistic(statistic);
    }, [statistic]);

    // <------------Change type statistic------------------>
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
            case 'Product Model':
                showProductModel();
                break;
            case 'Production':
                productsStatistics();
                break;
            case 'Status of Products':
                statusOfProducts();
                break;
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
        if (myChart5 !== undefined) {
            if (myChart5.ctx !== null) {
                myChart5.destroy();
            }
        }
    }

    // <------------Model product statistics------------------>

    const showProductModel = () => {
        var modelChartData = {};
        var modelChartLabels = ['iPhone', 'iPad', 'Mac'];
        var modelChartValues = [];
        var countIphone = 0,
            countIpad = 0,
            countMac = 0;
        for (let i = 0; i < model.models.length; i++) {
            switch (model.models[i].product_line) {
                case 'iphone':
                    countIphone++;
                    break;
                case 'ipad':
                    countIpad++;
                    break;
                case 'macintosh':
                    countMac++;
            }
        }
        modelChartValues.push(countIphone);
        modelChartValues.push(countIpad);
        modelChartValues.push(countMac);

        if (tableStatistic) {
            const curData = [
                {
                    product_line: 'iPhone',
                    quantity: modelChartValues[0],
                },
                {
                    product_line: 'iPad',
                    quantity: modelChartValues[1],
                },
                {
                    product_line: 'MacBook',
                    quantity: modelChartValues[2],
                },
            ];
            setDataSource(curData);
            const curColumns = [
                {
                    title: 'Product Line',
                    key: 'Product Line',
                    dataIndex: 'product_line',
                },
                {
                    title: 'Quantity',
                    key: 'Quantity',
                    dataIndex: 'quantity',
                },
            ];
            setColumns(curColumns);
        } else {
            modelChartData = {
                labels: modelChartLabels,
                datasets: [
                    {
                        label: 'Product Model',
                        data: modelChartValues,
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
            };
            setMyChart5(
                new Chart(chart5.current, {
                    type: 'bar',
                    data: modelChartData,
                }),
            );
        }
    };

    // <----------------Products Statistic-------------------->

    const productsStatistics = () => {
        // console.log(lotsData);
        if (tableStatistic) {
            const curData = getModelSta('iphone', 'TABLE')
                .concat(getModelSta('ipad', 'TABLE'))
                .concat(getModelSta('macintosh', 'TABLE'));
            setDataSource(curData);
            const curColumns = [
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
                            value: 'iPhone',
                        },
                        {
                            text: 'ipad',
                            value: 'iPad',
                        },
                        {
                            text: 'macintosh',
                            value: 'MacBook',
                        },
                    ],
                    filteredValue: filteredInfo.product_line || null,
                    onFilter: (value, record) => record.product_line === value,
                },
                {
                    title: 'Amount',
                    key: 'amount',
                    dataIndex: 'amount',
                },
            ];
            setColumns(curColumns);
        } else {
            resetCharts();
            // console.log(products)
            const numberOfIphone = allProducts.filter(
                (product) => product.product_line === 'iphone',
            ).length;
            const numberOfIpad = allProducts.filter(
                (product) => product.product_line === 'ipad',
            ).length;
            const numberOfMac = allProducts.filter(
                (product) => product.product_line === 'macintosh',
            ).length;

            const data1 = {
                labels: ['iPhone', 'iPad', 'Mac'],
                datasets: [
                    {
                        label: 'Percent of Product Lines',
                        data: [numberOfIphone, numberOfIpad, numberOfMac],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)',
                        ],
                        hoverOffset: 4,
                    },
                ],
            };
            setMyChart1(
                new Chart(chart1.current, {
                    type: 'pie',
                    data: data1,
                }),
            );
            setMyChart2(
                new Chart(chart2.current, {
                    type: 'bar',
                    data: getModelSta('iphone', 'CHART'),
                    options: {
                        plugins: {
                            autocolors: {
                                mode: 'data',
                            },
                        },
                    },
                }),
            );
            setMyChart3(
                new Chart(chart3.current, {
                    type: 'bar',
                    data: getModelSta('ipad', 'CHART'),
                    options: {
                        plugins: {
                            autocolors: {
                                mode: 'data',
                            },
                        },
                    },
                }),
            );
            setMyChart4(
                new Chart(chart4.current, {
                    type: 'bar',
                    data: getModelSta('macintosh', 'CHART'),
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

    const getModelSta = (product, typeSta) => {
        const notFilterLabel = allProducts.filter((p) => p.product_line === product);
        const labels = notFilterLabel.filter(
            (value, index, self) => index === self.findIndex((t) => t.model === value.model),
        );

        // console.log(labels);
        // .filter((item, pos, self) => self.indexOf(item) === pos);

        const datas = [];
        for (let i = 0; i < labels.length; i++) {
            let sum = 0;
            for (let j = 0; j < allProducts.length; j++) {
                // console.log(allProducts[j].model)
                // console.log(labels[i])
                if (allProducts[j].model === labels[i].model) {
                    sum++;
                }
            }
            datas.push(sum);
        }

        let returnData;
        if (typeSta === 'CHART') {
            returnData = {
                labels: labels.map((l) => l.model),
                datasets: [
                    {
                        label: `Amount of ${product}s produced`,
                        data: datas,
                    },
                ],
            };
        } else {
            const tableData = [];
            for (let i = 0; i < labels.length; i++) {
                tableData.push({
                    model: labels[i].model,
                    product_line: product,
                    amount: datas[i],
                });
            }
            returnData = tableData;
        }

        return returnData;
    };

    //<----------------Status of all pruduct-------------------->
    const fakeProducts1 = allProducts.map((e) => {
        return {
            ...e,
            status: Math.floor(Math.random() * 10),
        };
    });

    const statusOfProducts = () => {
        // console.log('this is ran')
        const models = allProducts
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
            const total = allProducts.filter((p) => p.model === models[i]).length;
            for (let j = 0; j < 10; j++) {
                let count = 0;
                count = allProducts.filter((p) => p.status === j && p.model === models[i]).length;
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
            setMyChart5(new Chart(chart5.current, chartData));
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

    //<----------------Status of all pruduct-------------------->

    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-[88px] px-16">
                <div className="flex justify-between">
                    <h2 className="font-bold">Statistics</h2>
                    <Select onChange={handleSelectChange} placeholder="Select Statistic" allowClear>
                        <Select.Option value="Product Model">Product Model</Select.Option>
                        <Select.Option value="Production">Production</Select.Option>
                        <Select.Option value="Status of Products">Status of Products</Select.Option>
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
                        <div>
                            <div className="single-chart">
                                <canvas ref={chart5} id="chart5"></canvas>
                            </div>
                            <div className="group-chart absolute left-24 top-40 flex justify-center mb-20 items-center flex-wrap">
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
//flex justify-center items-center w-5/6 mx-auto

export default statistics;
