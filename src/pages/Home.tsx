import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box, useColorModeValue } from "@chakra-ui/react";

const Home: React.FC = () => {
  return (
    <>
      <Header></Header>
      <Box
        bg={useColorModeValue("gray.600", "gray.600")}
        color={useColorModeValue("white", "white")}
      >
        <Box padding={2}>HEllo</Box>
      </Box>
      <Footer></Footer>
    </>
  );
};

export default Home;
