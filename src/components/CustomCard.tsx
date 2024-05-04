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
  useColorModeValue,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { RepoSearchResultItem } from "../models";
const Logo = () => {
  return <FaStar size={15} />;
};
function formatTimeAgo(updatedTime: string) {
  const currentTime = new Date();
  const timeDiff = currentTime.getTime() - new Date(updatedTime).getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
}
function starCount(star: number) {
  if (star > 1000) {
    return `${Math.floor(star / 1000)}k`;
  }
  return star;
}
const CustomCard = ({ data }: { data: RepoSearchResultItem }) => {
  return (
    <>
      <Card padding={[2, 3]} bg={useColorModeValue("gray.800", "gray.800")}>
        <Stack spacing={4}>
          <Flex align="center">
            <Avatar
              loading="lazy"
              size="sm"
              name="Username"
              src={data.owner?.avatar_url}
            />
            <Text
              ml={3}
              maxW="1000px"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {data.full_name}
            </Text>
          </Flex>
          <Text
            maxW="1400px"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {data.description}
          </Text>
          <Wrap spacing={2} justify="flex-start">
            {data.topics.map((topic, index) => (
              <Badge key={index} colorScheme="purple">
                {topic}
              </Badge>
            ))}
          </Wrap>
          <Flex align={"center"} gap={2}>
            {data.language && (
              <Tag size={"md"} variant="solid" colorScheme="teal">
                {data.language}
              </Tag>
            )}
            <Box display={"flex"} alignItems={"center"}>
              <Logo />
              <Text marginLeft={1}>{starCount(data.stargazers_count)}</Text>
            </Box>
            <Box display={"flex"}>
              <Text>Updated {formatTimeAgo(data.updated_at)}</Text>
            </Box>
          </Flex>
        </Stack>
      </Card>
    </>
  );
};

export default CustomCard;
