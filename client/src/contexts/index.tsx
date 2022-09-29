import React, { createContext, FC, useContext, useState } from 'react'

type Currency = {
    name: string
    symbol: string
    locale: string
}

export const CURRENCIES: Currency[] = [
    {
        name: 'USD',
        symbol: '$',
        locale: 'en-US',
    },
    {
        name: 'GBP',
        symbol: '£',
        locale: 'en-GB',
    },
]

interface IAppContext {
    currency: Currency
    toggleCurrency: () => void
}

const useApp = () => {
    const [currency, setCurrency] = useState(CURRENCIES[0])

    const toggleCurrency = () => {
        const current = CURRENCIES.findIndex((c) => c.name === currency.name)
        const next = CURRENCIES[current + 1] || CURRENCIES[0]
        setCurrency(next)
    }

    return {
        currency,
        toggleCurrency,
    }
}

export const AppContext = createContext<IAppContext>({} as IAppContext)
export const AppProvider: FC = ({ children }) => {
    const values = useApp()
    return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
