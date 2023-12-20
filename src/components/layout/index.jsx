"use client";

import {
  Flex,
  Grid,
  GridItem,
  useDisclosure,
  VStack,
  Heading
} from "@chakra-ui/react";
import NavItem from "../NavItem";
const Layout = ({ children }) => {

  return (
    <Grid h={"100vh"} bg={"#9488a6"} templateColumns="repeat(6, 1fr)">
      <GridItem rowSpan={1} colSpan={1} paddingX={2} paddingY={4}>
        <Heading marginX={2} marginY={4} fontSize='3xl' color={'white'}>BusYan</Heading>
        <VStack spacing={1} align="stretch">
          <NavItem to={'/dashboard'}>Dashboard</NavItem>
          <NavItem to={'/manage-bus'}>Manage Bus</NavItem>
          <NavItem to={'/manage-people'}>Manage People</NavItem>
          <NavItem to={'/bus-schedule'}>Bus Schedule</NavItem>
          <NavItem to={'/manage-job'}>Manage Job</NavItem>
        </VStack>
      </GridItem>
      <GridItem colSpan={5} bg={"white"} borderRadius={10}>
        <Flex direction={"column"}>
          {children}
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default Layout