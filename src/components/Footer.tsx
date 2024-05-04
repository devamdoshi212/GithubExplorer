import { FaGithub } from "react-icons/fa";
import React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const Logo = () => {
  return <FaGithub size={30} />;
};

export default function Footer() {
  return (
    <Box
      w="100%"
      p={2}
      bg={useColorModeValue("gray.800", "gray.800")}
      color={useColorModeValue("white", "white")}
    >
      <Container
        as={Stack}
        maxW={"9xl"}
        py={2}
        direction={{ base: "column", md: "row" }}
        spacing={2}
        justify={{ base: "center", md: "center" }}
        align={{ base: "center", md: "center" }}
      >
        <Logo />
        <Text>© 2024 Github Explorer. All rights reserved</Text>
      </Container>
    </Box>
  );
}
