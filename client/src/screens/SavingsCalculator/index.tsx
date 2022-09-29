import { Box, Fade, Flex, Heading, Slide, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import DefaultLayout from '../../components/layouts/Default'
import theme from '../../theme'
import { Chart } from './Chart'
import { FAQ } from './FAQ'
import { Input } from './Input'
import { SAVINGS_DEFAULTS, useSavings } from './useSavings'
import './style.css'
import { useAppContext } from '../../contexts'

export const SavingsCalculatorScreen = () => {
    const {
        savings,
        initial,
        monthly,
        interest,
        years,
        summary,
        isOpen,
        setInitial,
        setInterest,
        setMonthly,
        setYears,
    } = useSavings()

    const { currency } = useAppContext()

    return (
        <DefaultLayout>
            <Box position="relative">
                <Flex direction={{ base: 'column', lg: 'row' }} position="relative">
                    <Box
                        width={{
                            lg: 500,
                        }}
                        px={{
                            base: 6,
                            sm: 16,
                        }}
                        pt={{
                            base: 4,
                            sm: 12,
                        }}
                        pb={12}
                        position="relative"
                    >
                        <Slide direction="left" in={isOpen} style={{ zIndex: -1 }}>
                            <div className="gradient" />
                        </Slide>

                        <Flex
                            justifyContent="space-between"
                            flexDirection="column"
                            position="relative"
                            height="100%"
                        >
                            <Box>
                                <Heading
                                    as="h1"
                                    fontSize={{ base: '3xl', sm: '4xl' }}
                                    fontWeight={900}
                                >
                                    Savings calculator
                                </Heading>
                                <Heading fontSize="md" pt={4} color={theme.colors.grey5}>
                                    Just enter a few details below and we'll work out the future
                                    value of your savings.
                                </Heading>
                            </Box>

                            <Stack spacing={4} pb={10} pt={6}>
                                <Stack spacing={4} direction="row">
                                    <Input
                                        value={initial}
                                        label={`Initial (${currency.symbol})`}
                                        description="This is the amount you plan to deposit in the savings account initially."
                                        defaultValue={SAVINGS_DEFAULTS.INITIAL}
                                        symbol="💰"
                                        max={999999999}
                                        type="currency"
                                        onChange={setInitial}
                                    />
                                    <Input
                                        value={monthly}
                                        label={`Monthly (${currency.symbol})`}
                                        description="This is the amount you will deposit on an ongoing monthly basis. It's an optional field."
                                        placeholder="0"
                                        max={9999999}
                                        symbol="💸"
                                        type="currency"
                                        onChange={setMonthly}
                                    />
                                </Stack>
                                <Stack spacing={4} direction="row">
                                    <Input
                                        value={interest}
                                        defaultValue={SAVINGS_DEFAULTS.INTEREST}
                                        label="Interest rate"
                                        description="Annual interest rate on your savings"
                                        symbol="％"
                                        max={100}
                                        onChange={setInterest}
                                    />
                                    <Input
                                        value={years}
                                        defaultValue={SAVINGS_DEFAULTS.YEARS}
                                        label="Years"
                                        placeholder="50"
                                        description="This is the period of time your money will be in savings without a withdrawal. "
                                        max={100}
                                        symbol="⌛"
                                        onChange={setYears}
                                    />
                                </Stack>
                            </Stack>

                            <Fade in={isOpen}>
                                <Stack spacing={2} mb={10}>
                                    <Flex justifyContent={'space-between'}>
                                        <Text
                                            fontSize={'md'}
                                            fontWeight={700}
                                            color={theme.colors.grey5}
                                        >
                                            Initial
                                        </Text>
                                        <Text
                                            fontSize={'md'}
                                            fontWeight={900}
                                            color={theme.colors.grey5}
                                        >
                                            {summary.initial}
                                        </Text>
                                    </Flex>
                                    <Flex justifyContent={'space-between'}>
                                        <Text
                                            fontSize={'md'}
                                            fontWeight={700}
                                            color={theme.colors.grey5}
                                        >
                                            Aggregated refill
                                        </Text>
                                        <Text
                                            fontSize={'md'}
                                            fontWeight={900}
                                            color={theme.colors.grey5}
                                        >
                                            {summary.refill}
                                        </Text>
                                    </Flex>
                                    <Flex justifyContent={'space-between'}>
                                        <Text
                                            fontSize={'md'}
                                            fontWeight={700}
                                            color={theme.colors.grey5}
                                        >
                                            Interest gained
                                        </Text>
                                        <Text
                                            fontSize={'md'}
                                            color={theme.colors.success}
                                            fontWeight={900}
                                        >
                                            {summary.gains}
                                        </Text>
                                    </Flex>
                                </Stack>
                                <Flex direction="column" alignItems="center">
                                    <Text fontSize="lg" fontWeight={700}>
                                        In{' '}
                                        <b style={{ color: theme.colors.primary, fontWeight: 900 }}>
                                            {savings.length} years
                                        </b>{' '}
                                        you will have{' '}
                                    </Text>
                                    <Text fontSize="3xl" fontWeight={700}>
                                        <b style={{ color: theme.colors.primary, fontWeight: 900 }}>
                                            {summary.total}
                                        </b>
                                    </Text>
                                </Flex>
                            </Fade>
                        </Flex>
                    </Box>

                    <Flex
                        alignItems="space-between"
                        justifyContent="flex-end"
                        direction="column"
                        position="relative"
                        width={{ base: '100%', lg: 'calc(100% - 500px)' }}
                        pl={{
                            base: 8,
                            sm: 20,
                        }}
                        pr={{
                            base: 4,
                            sm: 10,
                        }}
                        pb={{
                            base: 12,
                            sm: 16,
                        }}
                        pt={{
                            base: 12,
                            lg: 0,
                        }}
                        my={{
                            lg: 10,
                        }}
                        background={theme.colors.white}
                        boxShadow={{ sm: 'xl' }}
                        borderLeftRadius={{
                            lg: 70,
                        }}
                    >
                        <Fade in={isOpen}>
                            <Chart data={savings} />
                        </Fade>
                    </Flex>
                </Flex>

                <Box
                    px={{
                        base: 8,
                        sm: 16,
                    }}
                    py={16}
                >
                    <FAQ />
                </Box>
            </Box>
        </DefaultLayout>
    )
}
