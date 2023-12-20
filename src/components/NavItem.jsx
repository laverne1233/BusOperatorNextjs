'use client'
import {
    Flex,
    Text,
    Icon,
    Box,
} from '@chakra-ui/react'

import { Link } from '@chakra-ui/next-js'

export default function NavItem({ children, to }) {
    return (
        <Link href={to} style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Flex
                align="center"
                px="4"
                mx="2"
                rounded="md"
                borderRadius="md"
                py="3"
                cursor="pointer"
                color="whiteAlpha.800"
                _hover={{
                    bg: "whiteAlpha.900",
                    color: "blackAlpha.900",
                }}
                role="group"
                fontWeight="semibold"
                transition=".15s ease"

            >
                {children}
            </Flex>
        </Link>
    )
}