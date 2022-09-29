import { useDisclosure } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useAppContext } from '../../contexts'

const API = {
    SAVINGS: 'http://localhost:3001/savings',
}

export const SAVINGS_DEFAULTS = {
    MONTHLY: 0,
    INITIAL: 1000,
    INTEREST: 2,
    YEARS: 50,
}

export function useSavings() {
    const { currency } = useAppContext()
    const [savings, setSavings] = useState([])
    const [monthly, setMonthly] = useState(SAVINGS_DEFAULTS.MONTHLY)
    const [initial, setInitial] = useState(SAVINGS_DEFAULTS.INITIAL)
    const [interest, setInterest] = useState(SAVINGS_DEFAULTS.INTEREST)
    const [years, setYears] = useState(SAVINGS_DEFAULTS.YEARS)

    const { isOpen, onToggle } = useDisclosure()

    const summary = useMemo(() => {
        const total = savings.length ? savings[savings.length - 1] : 0

        return {
            initial: initial.toLocaleString(currency.locale, {
                style: 'currency',
                currency: currency.name,
                maximumFractionDigits: 0,
            }),
            gains: (total - initial).toLocaleString(currency.locale, {
                style: 'currency',
                currency: currency.name,
                maximumFractionDigits: 0,
            }),
            refill: (savings.length * (monthly * 12)).toLocaleString(currency.locale, {
                style: 'currency',
                currency: currency.name,
                maximumFractionDigits: 0,
            }),
            total: total.toLocaleString(currency.locale, {
                style: 'currency',
                currency: currency.name,
                maximumFractionDigits: 0,
            }),
        }
    }, [savings, currency])

    const fetchSavings = async () => {
        try {
            const { data } = await fetch(
                `${API.SAVINGS}?initial=${initial}&monthly=${monthly}&interest=${interest}&years=${years}`,
                {
                    method: 'GET',
                }
            ).then((res) => res.json())
            setSavings(data)
            if (!isOpen) onToggle()
        } catch (err) {
            console.warn(err)
        }
    }

    useEffect(() => {
        let timeoutID = setTimeout(() => {
            if (initial != null && interest != null) {
                fetchSavings()
            }
        }, 300)
        return () => {
            clearTimeout(timeoutID)
        }
    }, [monthly, initial, interest, years])

    return {
        savings,
        initial,
        interest,
        monthly,
        years,
        summary,
        isOpen,
        fetchSavings,
        setMonthly,
        setInitial,
        setInterest,
        setYears,
    }
}
