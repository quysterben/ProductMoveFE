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
const statistics = () => {
    const { auth, model, lot, product } = useSelector((state) => state);
    const dispatch = useDispatch();
    const router = useRouter();
    const [tableStatistic, setTableStatistic] = useState(false);
    const chart1 = useRef('');
    const chart2 = useRef('');
    const chart3 = useRef('');
    const chart4 = useRef('');

    const [filteredInfo, setFilteredInfo] = useState({})
    
    const handleTableChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters)
        // doStatistic(statistic)
        // console.log(filteredInfo)
    }

    useEffect(() => {
        doStatistic(statistic)
    },[filteredInfo])

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn !== 'true') {
            router.push('/login');
        }
        dispatch(getAllModels({ auth }));
        // dispatch(getLotData({ auth, data:1 }))
        dispatch(getProductsData({ auth }));
    }, [dispatch, auth]);

    const lotsData = product.products
    .map((param) => param.lot_number)
    .filter((e, i, a) => a.indexOf(e) === i);

    Chart.register(autocolors);
    const [myChart1, setMyChart1] = useState();
    const [myChart2, setMyChart2] = useState();
    const [myChart3, setMyChart3] = useState();
    const [myChart4, setMyChart4] = useState();

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
            case 'Product Model':
                showProductModel();
                break;
            case 'Production':
                productsStatistics();
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
            setMyChart1(
                new Chart(chart1.current, {
                    type: 'bar',
                    data: modelChartData,
                }),
            );
        }
    };

    // <----------------Products Statistic-------------------->

    const productsStatistics = () => {
        console.log(lotsData)
        if (tableStatistic) {
            const curData = getModelSta('iPhone', 'TABLE')
                .concat(getModelSta('iPad', 'TABLE'))
                .concat(getModelSta('MacBook', 'TABLE'));
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
                            value: 'iPhone'
                        },
                        {
                            text: 'ipad',
                            value: 'iPad'
                        },
                        {
                            text: 'macintosh',
                            value: 'MacBook'
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
            const numberOfIphone = products.filter(
                (product) => product.product_line === 'iphone',
            ).length;
            const numberOfIpad = products.filter(
                (product) => product.product_line === 'ipad',
            ).length;
            const numberOfMac = products.filter(
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
                    data: getModelSta('iPhone', 'CHART'),
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
                    data: getModelSta('iPad', 'CHART'),
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
                    data: getModelSta('MacBook', 'CHART'),
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

    const getModelSta = (product_line, typeSta) => {
        const lotsFilter = lots.filter((lot) => lot.model.includes(product_line));
        var labels = [];
        const allName = lotsFilter.map((p) => p.model);
        for (let i = 0; i < allName.length; i++) {
            if (labels.find((l) => l === allName[i]) === undefined) {
                labels.push(allName[i]);
            }
        }

        const datas = [];
        for (let i = 0; i < labels.length; i++) {
            const arrayFullName = lotsFilter
                .filter((p) => p.model === labels[i])
                .map((p) => p.amount);
            datas.push(arrayFullName.reduce((a, b) => a + b, 0));
        }

        const returnData =
            typeSta === 'CHART'
                ? {
                      labels: labels,
                      datasets: [
                          {
                              label: `Amount of ${product_line}s produced`,
                              data: datas,
                          },
                      ],
                  }
                : () => {
                      const tableData = [];
                      for (let i = 0; i < labels.length; i++) {
                          tableData.push({
                              model: labels[i],
                              product_line: product_line,
                              amount: datas[i],
                          });
                      }
                      return tableData;
                  };

        if (typeSta === 'CHART') {
            returnData = {
                labels: labels,
                datasets: [
                    {
                        label: `Amount of ${product_line}s produced`,
                        data: datas,
                    },
                ],
            };
        } else {
            const tableData = [];
            for (let i = 0; i < labels.length; i++) {
                tableData.push({
                    model: labels[i],
                    product_line: product_line,
                    amount: datas[i],
                });
            }
            returnData = tableData;
        }

        return returnData;
    };

    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-[88px] px-16">
                <div className="flex justify-between">
                    <h2 className="font-bold">Statistics</h2>
                    <Select onChange={handleSelectChange} placeholder="Select Statistic" allowClear>
                        <Select.Option value="Product Model">Product Model</Select.Option>
                        <Select.Option value="Production">Production</Select.Option>
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
                                bordered = {true}
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
//flex justify-center items-center w-5/6 mx-auto

export default statistics;
