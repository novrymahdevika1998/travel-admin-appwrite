import { Box, BoxProps } from '@chakra-ui/react'

const Main = ({ children }: BoxProps) => {
    return (
        <Box
            as="main"
            sx = {{
                flexGrow: 1,
                py: '98px',
                width: `calc(100% - 250px)`,
            }}
        >
            {children}
        </Box>
    )
}

export default Main