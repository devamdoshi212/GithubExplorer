import { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";

import { FaGithub } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
const Links = [
  {
    label: "Home",
    link: "/",
  },
];

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link
    as={RouterLink}
    _activeLink={{
      bg: useColorModeValue("gray.300", "gray.300"),
      color: useColorModeValue("black", "black"),
    }}
    px={2}
    py={1}
    bg={useColorModeValue("gray.800", "gray.800")}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.400", "gray.400"),
    }}
    to={href}
  >
    {children}
  </Link>
);
const Logo = () => {
  return <FaGithub size={40} />;
};

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg={useColorModeValue("gray.800", "gray.800")}
        color={useColorModeValue("white", "white")}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size="20px"
            fontSize="20px"
            icon={
              isOpen ? <IoClose size={30} /> : <GiHamburgerMenu size={30} />
            }
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            justifyContent="center"
            alignItems="center"
          />
          <HStack alignItems={"center"}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Logo />
              <Box fontSize={"x-large"} marginLeft={"12px"}>
                Github Explorer
              </Box>
            </Flex>
            <HStack
              as={"nav"}
              spacing={4}
              marginLeft={"12px"}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link, index) => (
                <NavLink key={index} href={link.link}>
                  {link.label}
                </NavLink>
              ))}
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link, index) => (
                <NavLink key={index} href={link.link}>
                  {link.label}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
