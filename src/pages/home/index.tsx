import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import carBackground from "../../assets/carBackground.svg";
import { NavFilters } from "../../components/navFilters";
import { ModalNavFilter } from "../../components/filtersModal";
import { useState } from "react";
import {
  CardAdvertisement,
  iCardProps,
} from "../../components/cardAdvertisement";
import { advertisementsCars } from "../../../mocked";

export const Home = () => {
  const [advertisements, setAdvertisements] = useState<iCardProps[]>([
    ...advertisementsCars,
  ]);

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
        <Flex flexDirection={"row"}>
          <Box display={{ base: "none", md: "flex" }}>
            <NavFilters />
          </Box>
          <Flex
            wrap={{ base: "nowrap", md: "wrap" }}
            h={"100%"}
            alignContent={"flex-end"}
            mt={"1rem"}
            overflowX={{ base: "auto", md: "hidden" }}
          >
            {!!advertisements.length &&
              advertisements.map((advertisement) => (
                <Flex
                  w={{ base: "100%", md: "50%", xl: "33%" }}
                  justifyContent={"flex-end"}
                  mb={"2rem"}
                >
                  <CardAdvertisement
                    key={advertisement.id}
                    title={advertisement.title}
                    description={advertisement.description}
                    owner={advertisement.owner}
                    km={advertisement.km}
                    year={advertisement.year}
                    price={advertisement.price}
                    image={advertisement.image}
                    isGoodBuy={advertisement.isGoodBuy}
                    isActive={advertisement.isActive}
                    isHomePage={advertisement.isHomePage}
                  />
                </Flex>
              ))}
          </Flex>
        </Flex>
        <ModalNavFilter />
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w={"100%"}
          marginY={"2rem"}
          gap={{ base: "1rem", md: "2rem" }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Text textStyle={"heading_5_600"} color={"grey.3"}>
            1 de 2
          </Text>
          <Button
            color={"brand.2"}
            textStyle={"heading_5_600"}
            variant={"link"}
          >
            {"Seguinte >"}
          </Button>
        </Flex>
      </Box>
      <Footer />
    </Flex>
  );
};
