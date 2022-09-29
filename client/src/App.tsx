import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'
import './App.css'
import { AppProvider } from './contexts'
import { SavingsCalculatorScreen } from './screens'
import theme from './theme'

const defaultTheme = extendTheme(theme)

function App() {
    return (
        <AppProvider>
            <ChakraProvider theme={defaultTheme}>
                <SavingsCalculatorScreen />
            </ChakraProvider>
        </AppProvider>
    )
}

export default App
