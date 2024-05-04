import {
  Avatar,
  Badge,
  Box,
  Card,
  Flex,
  Stack,
  Tag,
  Text,
  Wrap,
} from "@chakra-ui/react";
import React from "react";
import { FaStar } from "react-icons/fa";
const Logo = () => {
  return <FaStar size={15} />;
};
const CustomCard: React.FC = () => {
  return (
    <>
      <Card padding={[2, 4]}>
        <Stack spacing={4}>
          <Flex align="center">
            <Avatar
              loading="lazy"
              size="sm"
              name="Username"
              src="avatar-url.jpg"
            />
            <Text ml={3}>Username</Text>
          </Flex>
          <Text>View a summary of all your customers over the last month.</Text>
          <Wrap spacing={2} justify="flex-start">
            {[...Array(12).keys()].map((index) => (
              <Badge key={index} colorScheme="purple">
                New
              </Badge>
            ))}
          </Wrap>
          <Flex align={"center"} gap={2}>
            <Tag size={"md"} variant="solid" colorScheme="teal">
              Teal
            </Tag>
            <Box display={"flex"} alignItems={"center"}>
              <Logo />
              <Text marginLeft={1}>1.5k</Text>
            </Box>
            <Box display={"flex"}>
              <Text>Updated 29 days ago</Text>
            </Box>
          </Flex>
        </Stack>
      </Card>
    </>
  );
};

export default CustomCard;
