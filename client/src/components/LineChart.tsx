import { ChartLegendOptions, ChartOptions } from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'
import theme from '../theme'

type Props = {
    xAxisData: number[] | string[]
    yAxisData: number[]
    title?: string
    options?: ChartOptions
}

const LineChart = ({ xAxisData, yAxisData, title, options }: Props) => {
    const legendOptions: ChartLegendOptions = {
        display: false,
    }

    const chartOptions: ChartOptions = {
        title: {
            display: !!title,
            text: title,
        },
        scales: {
            gridLines: { display: false },
            yAxes: [
                {
                    position: 'right',
                    gridLines: { display: false },
                },
            ],
            xAxes: [
                {
                    ticks: { display: true },
                    gridLines: { display: false },
                },
            ],
        },
        ...options,
    }

    return (
        <Line
            data={{
                labels: xAxisData,
                datasets: [
                    {
                        backgroundColor: theme.colors.blue100,
                        borderColor: theme.colors.primary,
                        data: yAxisData,
                        pointHoverBackgroundColor: theme.colors.primary,
                    },
                ],
            }}
            options={chartOptions}
            legend={legendOptions}
        />
    )
}

export default LineChart
