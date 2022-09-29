import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Heading,
    Text,
} from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useAppContext } from '../../contexts'
import theme from '../../theme'

export const FAQ = () => {
    const { currency } = useAppContext()
    const questions = useMemo(
        () => [
            {
                question: `How can I save ${currency.symbol}5000?`,
                answer: `If you started with zero and put away ${currency.symbol}150 a month (about ${currency.symbol}37.50 a week) in a savings account that earns 0.50% APY, you would save more than ${currency.symbol}5,000 in under three years. Use this savings calculator to compare other contribution amounts.`,
            },
            {
                question: `How much interest can you earn on ${currency.symbol}10,000?`,
                answer: `If your savings account earns only 0.01% APY, your earnings after a year would be ${currency.symbol}1. Put that ${currency.symbol}10,000 in a high-yield savings account that earns 0.50% APY for the same amount of time, and you can earn about ${currency.symbol}50.`,
            },
            {
                question: 'How much will a savings account grow?',
                answer: 'The answer depends on the interest rate, deposit balances and time. The higher the rate, the faster a savings account will grow. Also, because of compounding, the more often interest is deposited into a savings account, the more the overall balance will grow. An account that compounds daily can grow slightly faster than one that compounds less frequently, such as once a month. To get the most growth over time, put your money in an account with a high yield that compounds daily.',
            },
        ],
        [currency]
    )

    const renderItems = useMemo(
        () =>
            questions.map((item, index) => (
                <AccordionItem key={`accordion-question-${index}`} borderBottom={0} borderTop={0}>
                    <AccordionButton
                        pl={0}
                        pr={0}
                        _hover={{
                            background: 'none',
                        }}
                        _focus={{
                            background: 'none',
                        }}
                    >
                        <Box flex="1" textAlign="left">
                            <Heading fontSize="md" color={theme.colors.primary} fontWeight={900}>
                                {item?.question}
                            </Heading>
                        </Box>
                        <AccordionIcon color={theme.colors.primary} />
                    </AccordionButton>
                    <AccordionPanel pb={4} pl={0}>
                        <Text color={theme.colors.grey5}>{item?.answer}</Text>
                    </AccordionPanel>
                </AccordionItem>
            )),
        [questions]
    )

    return (
        <Box position="relative">
            <Box pb={4}>
                <Heading fontSize="xl" fontWeight={900}>
                    Frequently asked questions
                </Heading>
            </Box>
            <Accordion defaultIndex={[0]} allowMultiple allowToggle>
                {renderItems}
            </Accordion>
        </Box>
    )
}
