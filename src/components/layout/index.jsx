"use client";

import {
	Button,
	Collapse,
	Flex,
	Grid,
	GridItem,
	useDisclosure,
} from "@chakra-ui/react";
const Layout = ({children}) => {
	const { isOpen, onToggle } = useDisclosure();
  
  return (
    <Grid h={"100vh"} bg={"#9488a6"} templateColumns="repeat(6, 1fr)">
    <GridItem rowSpan={1} colSpan={1}>
      <Button onClick={onToggle}>Click Me</Button>
      <Collapse in={isOpen} animateOpacity>
          <Flex as={"nav"} direction={"column"}>
            
          </Flex>
      </Collapse>
    </GridItem>
    <GridItem colSpan={5} bg={"white"} borderRadius={10} m={2}>
      <Flex direction={"column"}>
        {children}
      </Flex>
    </GridItem>
  </Grid>
  )
}

export default Layout