import { Box, Flex, HStack, useColorModeValue } from "@chakra-ui/react";

import { FaGithub } from "react-icons/fa";

const Logo = () => {
  return <FaGithub size={40} />;
};

export default function Header() {
  return (
    <>
      <Box
        bg={useColorModeValue("gray.800", "gray.800")}
        color={useColorModeValue("white", "white")}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack alignItems={"center"}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Logo />
              <Box fontSize={"x-large"} marginLeft={"12px"}>
                Github Explorer
              </Box>
            </Flex>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}
