import {
    FormControl,
    FormLabel,
    Icon,
    InputLeftElement,
    InputRightElement,
    NumberInput,
    NumberInputField,
    Tooltip,
    UseCounterProps,
} from '@chakra-ui/react'
import { rgba } from 'polished'
import React from 'react'
import theme from '../../theme'

type Props = {
    label: string
    value: number
    placeholder?: string
    description?: string
    symbol?: string
    min?: number
    max?: number
    type?: 'currency'
    defaultValue?: number
    onChange: (value: number) => void
}

export const Input = ({
    value,
    placeholder,
    label,
    description,
    symbol,
    min = 0,
    max,
    type,
    defaultValue,
    onChange,
}: Props) => {
    const onChangeEvent: UseCounterProps['onChange'] = (valueAsString, valueAsNumber) => {
        if (isNaN(valueAsNumber)) return onChange(min)

        if (valueAsNumber < min) {
            onChange(min)
            return
        }

        if (max && valueAsNumber > max) {
            onChange(max)
            return
        }

        onChange(valueAsNumber)
    }

    const format = (val: number) => {
        if (!val) return min
        if (type === 'currency') return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

        return val
    }

    return (
        <FormControl>
            <FormLabel fontWeight={700}>{label}</FormLabel>
            <NumberInput
                errorBorderColor={rgba(theme.colors.danger, 0.5)}
                size="md"
                min={min}
                max={max}
                defaultValue={defaultValue}
                focusBorderColor={theme.colors.primary}
                background={theme.colors.white}
                borderRadius={5}
                value={format(value)}
                onChange={onChangeEvent}
                clampValueOnBlur={false}
                keepWithinRange
            >
                <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children={symbol}
                />
                <NumberInputField
                    color={theme.colors.primary}
                    pl={9}
                    pr={9}
                    placeholder={placeholder}
                    fontWeight={900}
                />

                {description && (
                    <InputRightElement
                        color="gray.300"
                        fontSize="1.2em"
                        children={
                            <Tooltip
                                borderRadius={10}
                                px={4}
                                py={3}
                                backgroundColor={theme.colors.primary}
                                label={description}
                            >
                                <Icon name="info" />
                            </Tooltip>
                        }
                    />
                )}
            </NumberInput>
        </FormControl>
    )
}
