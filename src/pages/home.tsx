import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import carBackground from "../assets/carBackground.svg";
import { NavFilters } from "../components/navFilters";
import { ModalNavFilter } from "../components/filtersModal";

export const Home = () => {
  return (
    <Flex h={"max-content"} w={"100%"}>
      <Header user={"Christian"} isLogged={true} />
      <Box
        mt={"80px"}
        mb={{ base: "220px", md: "150px" }}
        w={"100%"}
        h={"max-contenct"}
      >
        <Flex
          w="100%"
          position="relative"
          h={{ base: "550px", sm2: "430px" }}
          alignItems={"center"}
        >
          <Box
            bgGradient="linear(180deg, rgba(0, 0, 0, 0.29) 0%, #000000 100%)"
            position="absolute"
            w="100%"
            h="100%"
          ></Box>
          <Image
            src={carBackground}
            objectFit={"cover"}
            h={{ base: "60%", sm2: "100%" }}
            w={"100%"}
            zIndex={"-2"}
          />
          <Box
            position="absolute"
            top={{ base: "20%", sm2: "50%" }}
            left="50%"
            transform="translate(-50%, -50%)"
            textAlign="center"
            color="white"
          >
            <Text
              color="whiteFixed"
              textStyle={{ base: "heading_3_500", sm2: "heading_2_600" }}
              textAlign="center"
              marginBottom={"0.5rem"}
            >
              Motors Shop
            </Text>
            <Text
              color="whiteFixed"
              textStyle={{ base: "heading_4_500", sm2: "heading_3_500" }}
              lineHeight={{ base: "24px", sm2: "28px" }}
              textAlign="center"
              w="90VW"
            >
              A melhor plataforma de anúncios de carros do país
            </Text>
          </Box>
        </Flex>
        <Box display={{ base: "none", md: "flex" }}>
          <NavFilters />
        </Box>
        <ModalNavFilter />
      </Box>
      <Footer />
    </Flex>
  );
};
