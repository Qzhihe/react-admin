import * as React from 'react';
import ReactECharts from 'echarts-for-react';

import {
    Card,
    Paper,
    createTheme,
    ThemeProvider,
} from "@mui/material";

import { useSelector } from 'react-redux';

const theme = createTheme();

const Dashboard = () => {
    const items = useSelector(state => state.item.items);

    const option = {
        title: {
            text: 'Items',
            top: "top",
            left: "left",
            textStyle: {
                fontSize: 30
            },
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Items',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 12,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: getChartData()
            }
        ]
    };

    function getChartData() {
        const raw = items.reduce((prev, cur, idx) => {
            if (!prev.get(cur.label)) {
                prev.set(cur.label, 1);
            } else {
                prev.set(cur.label, prev.get(cur.label) + 1);
            }

            return prev;
        }, new Map());

        return Array.from(raw).map(item => {
            return {
                name: item[0],
                value: item[1],
            };
        });
    }

    function handleChartClick(ev) {
        console.log(ev);
    }

    return (
        <ThemeProvider theme={theme}>
            <Paper>
                <Card>
                    <ReactECharts option={option} onEvents={{
                        click: handleChartClick
                    }} />
                </Card>
            </Paper>
        </ThemeProvider>
    );
};

export default Dashboard;