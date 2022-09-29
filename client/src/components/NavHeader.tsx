import { Button, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { useAppContext } from '../contexts'
import images from '../images'
import theme from '../theme'

const NavHeader = () => {
    const { currency, toggleCurrency } = useAppContext()

    return (
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center" px={6} py={4}>
            <Image src={images.fullBrandLogo} alt="Finimize" height="25px" />
            <Button
                color={theme.colors.white}
                background={theme.colors.primary}
                _hover={{
                    background: theme.colors.blue400,
                }}
                _focus={{
                    borderColor: 'transparent',
                }}
                size="sm"
                onClick={toggleCurrency}
            >
                {currency.name}
            </Button>
        </Flex>
    )
}

export default NavHeader
