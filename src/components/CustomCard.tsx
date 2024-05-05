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
import { TbGitFork } from "react-icons/tb";
import { RepoSearchResultItem } from "../models";
import { Link } from "react-router-dom";
const StarLogo = () => {
  return <FaStar size={15} />;
};
const ForkLogo = () => {
  return <TbGitFork size={18} />;
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
function Count(star: number) {
  if (star > 1000) {
    return `${(star / 1000).toFixed(2)}k`;
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
            <Link to={data.html_url} target="_blank">
              <Text
                maxW={["300px", "1000px"]}
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {data.full_name}
              </Text>
            </Link>
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
              <Tag
                size={"md"}
                variant="solid"
                colorScheme="teal"
                fontSize={["0.7rem", "1rem"]}
              >
                {data.language}
              </Tag>
            )}
            <Box display={"flex"} alignItems={"center"}>
              <StarLogo />
              <Text marginLeft={1}>{Count(data.stargazers_count)}</Text>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <ForkLogo />
              <Text marginLeft={1}>{Count(data.forks_count)}</Text>
            </Box>
            <Box display={"flex"}>
              <Text fontSize={["0.8rem", "1rem"]}>
                Updated {formatTimeAgo(data.updated_at)}
              </Text>
            </Box>
          </Flex>
        </Stack>
      </Card>
    </>
  );
};

export default CustomCard;
