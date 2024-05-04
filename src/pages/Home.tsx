import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import CustomCard from "../components/CustomCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepo, selectAllRepositories } from "../store/RepositorySlice";
import { RepoSearchResultItem } from "../models";
import { AppDispatch } from "../store";

const Home: React.FC = () => {
  const AllRepository: RepoSearchResultItem[] = useSelector(
    selectAllRepositories
  );
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRepo());
  }, []);
  console.log(AllRepository);
  return (
    <>
      <Header></Header>
      <Box
        bg={useColorModeValue("gray.600", "gray.600")}
        color={useColorModeValue("white", "white")}
      >
        <Box>All filter and sort and search button</Box>
        <SimpleGrid columns={1} spacing={5} padding={2}>
          <CustomCard></CustomCard>
          <CustomCard></CustomCard>
          <CustomCard></CustomCard>
          <CustomCard></CustomCard>
        </SimpleGrid>
      </Box>
      <Footer></Footer>
    </>
  );
};

export default Home;
