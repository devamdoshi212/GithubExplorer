import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  useColorModeValue,
} from "@chakra-ui/react";
import CustomCard from "../components/CustomCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRepo,
  getStatus,
  getTotalCount,
  selectAllRepositories,
} from "../store/RepositorySlice";
import { RepoSearchResultItem } from "../models";
import { AppDispatch } from "../store";
import { QuerySliceActions, api } from "../store/QuerySlice";
import { BiSearch } from "react-icons/bi";

const pageArray = [
  { page: "10" },
  { page: "20" },
  { page: "30" },
  { page: "40" },
  { page: "50" },
  { page: "60" },
  { page: "70" },
  { page: "80" },
  { page: "90" },
  { page: "100" },
];
const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const AllRepository: RepoSearchResultItem[] = useSelector(
    selectAllRepositories
  );
  const totalCount = useSelector(getTotalCount);
  const status: string = useSelector(getStatus);
  const API: string = useSelector(api);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("stars");
  const [order, setOrder] = useState<string>("desc");
  const [page, setPage] = useState<number>(1);
  const [per_page, setPer_Page] = useState<string>("10");

  useEffect(() => {
    dispatch(
      QuerySliceActions.setParams({
        q: search,
        sort: sort,
        order: order,
        page: page,
        per_page: parseInt(per_page),
      })
    );
    dispatch(fetchRepo(API));
  }, [dispatch, order, page, search, sort, per_page, API]);
  const nextHandler = () => {
    if (page <= parseInt(totalCount + "") / parseInt(per_page))
      setPage((p) => p + 1);
  };
  const prevHandler = () => {
    if (page != 1) setPage((p) => p - 1);
  };
  console.log(AllRepository);
  return (
    <>
      <Header></Header>
      <Box
        bg={useColorModeValue("gray.600", "gray.600")}
        color={useColorModeValue("white", "white")}
      >
        <Wrap
          paddingX={[4, 6, 8, 10]}
          paddingY={[4, 5, 7]}
          spacing={2}
          justify="flex-start"
        >
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <BiSearch size={20} />
              </InputLeftElement>
              <Input
                type="tel"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Stack>
          <Stack>
            <Select
              style={{ backgroundColor: "#4A5568" }}
              value={order}
              onChange={(e) => {
                setOrder(e.target.value);
              }}
            >
              <option style={{ backgroundColor: "#4A5568" }} value="stars">
                Most stars
              </option>
              <option style={{ backgroundColor: "#4A5568" }} value="updated">
                Recently Updated
              </option>
              <option style={{ backgroundColor: "#4A5568" }} value="created">
                Recently Created
              </option>
            </Select>
          </Stack>
          <Stack>
            <Select
              style={{ backgroundColor: "#4A5568" }}
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
              }}
            >
              <option style={{ backgroundColor: "#4A5568" }} value="desc">
                Descending
              </option>
              <option style={{ backgroundColor: "#4A5568" }} value="asc">
                Ascending
              </option>
            </Select>
          </Stack>

          <Stack>
            <Select
              style={{ backgroundColor: "#4A5568" }}
              value={per_page}
              onChange={(e) => {
                setPer_Page(e.target.value);
              }}
            >
              {pageArray.map((e, i) => {
                return (
                  <option
                    key={i}
                    style={{ backgroundColor: "#4A5568" }}
                    value={e.page}
                  >
                    {e.page}
                  </option>
                );
              })}
            </Select>
          </Stack>
          <Text ml={3} alignItems={"center"} alignContent={"center"}>
            Record per Page
          </Text>
        </Wrap>
        {status == "loading" && (
          <Flex justifyContent={"center"}>
            <CircularProgress isIndeterminate size={100} color="green.300" />
          </Flex>
        )}
        <SimpleGrid columns={1} spacing={5} paddingX={[4, 6, 8, 10]}>
          {AllRepository &&
            status == "succeeded" &&
            AllRepository.map((repo, index) => {
              return <CustomCard key={index} data={repo}></CustomCard>;
            })}
        </SimpleGrid>
        <Flex justify="center" align="center" paddingY={[4, 6, 8, 10]}>
          <Button onClick={prevHandler} disabled={page == 1}>
            Prev
          </Button>
          <Text mx={4}>
            {page * parseInt(per_page) - parseInt(per_page) + 1} to{" "}
            {page * parseInt(per_page)} of {totalCount}
          </Text>
          <Button
            onClick={nextHandler}
            disabled={page < parseInt(totalCount + "") / parseInt(per_page)}
          >
            Next
          </Button>
        </Flex>
      </Box>
      <Footer></Footer>
    </>
  );
};

export default Home;
