import { Box, BoxProps, CloseButton, Flex, Text, useColorModeValue } from "@chakra-ui/react"
import LinkItems from "./config"
import NavItem from "./NavItem"

interface NavbarProps extends BoxProps {
    onClose: () => void
}

const Navbar = ({ onClose, ...other }: NavbarProps) => {
    return (
        <Flex
            direction='column'
            height='1rem'
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontWeight="bold">Logo</Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Flex>
    )
}

export default Navbar