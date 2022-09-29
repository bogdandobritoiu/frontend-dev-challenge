import { Box, Heading, Text } from '@chakra-ui/react'
import { ChartOptions, ChartTooltipItem } from 'chart.js'
import React, { useMemo } from 'react'
import LineChart from '../../components/LineChart'
import { useAppContext } from '../../contexts'
import theme from '../../theme'

type Props = {
    data: number[]
}

export const Chart = ({ data }: Props) => {
    const { currency } = useAppContext()

    const xAxisData = useMemo(
        () => new Array(data.length).fill(0).map((_, index) => index + 1),
        [data]
    )

    const formatLabel = useMemo(
        () => (item: ChartTooltipItem) => {
            return new Intl.NumberFormat(currency.locale as string, {
                style: 'currency',
                currency: currency.name,
            }).format(Number(item.value))
        },
        []
    )

    const formatTitle = useMemo(
        () => (item: ChartTooltipItem[]) => {
            return `Year ${item[0].label}`
        },
        []
    )

    const formatTicks: Chart.NestedTickOptions['callback'] = useMemo(
        () => (value) => {
            return new Intl.NumberFormat(currency.locale, {
                notation: 'compact',
                currency: currency.name,
                maximumFractionDigits: 1,
            })
                .format(Number(value))
                .toString()
        },
        [currency]
    )

    const options: ChartOptions = useMemo(
        () => ({
            tooltips: {
                displayColors: false,
                mode: 'index',
                intersect: false,
                axis: 'x',
                backgroundColor: theme.colors.primary,
                bodyFontStyle: 'black',
                callbacks: {
                    label: formatLabel,
                    title: formatTitle,
                },
            },
            hover: {
                intersect: true,
            },
            scales: {
                yAxes: [
                    {
                        position: 'right',
                        gridLines: { display: false },
                        ticks: {
                            callback: formatTicks,
                            fontColor: theme.colors.grey4,
                            fontStyle: 'bold',
                        },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            display: true,
                            maxRotation: 0,
                            fontColor: theme.colors.grey4,
                            fontStyle: 'bold',
                        },
                        gridLines: { display: false },
                    },
                ],
            },
        }),
        []
    )

    return (
        <Box>
            <LineChart xAxisData={xAxisData} yAxisData={data} options={options} />
            <Box
                position={{ base: 'relative', sm: 'absolute' }}
                top={0}
                pt={{
                    base: 10,
                    sm: 16,
                }}
                width={{
                    sm: '60%',
                }}
            >
                <Heading color={theme.colors.primary} fontWeight={900} mb={4} fontSize="xl">
                    How long will it take to reach my goal amount?
                </Heading>
                <Text fontSize="md" color={theme.colors.grey5}>
                    First, run the numbers without a monthly deposit.
                </Text>
                <Text fontSize="md" color={theme.colors.grey5}>
                    Then try it with{' '}
                    <b style={{ color: 'black', fontWeight: 900 }}>{currency.symbol}25</b> or{' '}
                    <b style={{ color: 'black', fontWeight: 900 }}>{currency.symbol}100</b> per
                    month to see how adding even a small amount can move you closer to your goal.
                </Text>
            </Box>
        </Box>
    )
}
