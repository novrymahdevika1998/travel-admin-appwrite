import React, { useState } from 'react'
import Main from './Main'
import { Outlet } from 'react-router-dom'
import Sidebar from './navbar/Navbar'
import { Box, Drawer, DrawerContent, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import MobileNav from './navbar/NavMobile'
import SidebarContent from './navbar/NavbarContent'

const DashboardLayout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
                <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
                <Drawer
                    isOpen={isOpen}
                    placement="right"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    onOverlayClick={onClose}
                    size="full"
                >
                    <DrawerContent>
                        <SidebarContent onClose={onClose} />
                    </DrawerContent>
                </Drawer>
                <MobileNav onOpen={onOpen} />
                <Box ml={{ base: 0, md: 60 }} p="4">
                    <Outlet />
                </Box>
            </Box>
        </>
    )
}

export default DashboardLayout