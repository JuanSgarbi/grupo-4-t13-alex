import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import carBackground from "../../assets/carBackground.svg";
import { NavFilters } from "../../components/navFilters";
import { ModalNavFilter } from "../../components/filtersModal";
import { useEffect, useState } from "react";
import { CardAdvertisement } from "../../components/cardAdvertisement";
import { useAd } from "../../context/announcements.context";

export const Home = () => {
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);
  const [years, setYears] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const { announcements, page, setPage, totalPages, nextPage, previusPage } = useAd();
  const [isActiveAnnounce, setIsActiveAnnounce] = useState([]);

  useEffect(() => {
    const filter = announcements.filter((el) => el.isPublished);
    setIsActiveAnnounce(filter);
    let listFiltered = announcements;
    if (filteredAnnouncements.length > 0) {
      listFiltered = filteredAnnouncements;
    }

    listFiltered.map((elem) => {
      if (
        !brands.some(
          (brand) => brand.toLowerCase() === elem.brand.toLowerCase()
        )
      ) {
        setBrands([...brands, elem.brand]);
      }
      if (
        !models.some(
          (model) =>
            model.toLowerCase() === elem.model.toLowerCase().split(" ")[0]
        )
      ) {
        setModels([...models, elem.model.split(" ")[0]]);
      }
      if (
        !colors.some(
          (color) => color.toLowerCase() === elem.color.toLowerCase()
        )
      ) {
        setColors([...colors, elem.color]);
      }
      if (!years.includes(elem.year)) {
        setYears([...years, elem.year]);
      }
      if (
        !fuels.some((fuel) => fuel.toLowerCase() === elem.fuel.toLowerCase())
      ) {
        setFuels([...fuels, elem.fuel]);
      }
    });
  }, [
    brands,
    models,
    colors,
    years,
    fuels,
    filteredAnnouncements,
    announcements,
  ]);

  const filtering = (category, characteristic) => {
    setBrands([]);
    setModels([]);
    setColors([]);
    setYears([]);
    setFuels([]);

    if (category == "year") {
      if (filteredAnnouncements.length == 0) {
        const filtereds = announcements.filter(
          (elem) => elem[category] == parseInt(characteristic)
        );
        setFilteredAnnouncements(filtereds);
      } else {
        const newFiltered = filteredAnnouncements.filter(
          (elem) => elem[category] == parseInt(characteristic)
        );
        if (newFiltered.length > 0) {
          setFilteredAnnouncements(newFiltered);
        }
      }
    } else if (category == "model") {
      const filtereds = announcements.filter(
        (elem) =>
          elem[category].toLowerCase().split(" ")[0] ==
          characteristic.toLowerCase()
      );
      setFilteredAnnouncements(filtereds);
    } else {
      if (filteredAnnouncements.length == 0) {
        const filtereds = announcements.filter(
          (elem) => elem[category].toLowerCase() == characteristic.toLowerCase()
        );
        setFilteredAnnouncements(filtereds);
      } else {
        const newFiltered = filteredAnnouncements.filter(
          (elem) => elem[category].toLowerCase() == characteristic.toLowerCase()
        );
        if (newFiltered.length > 0) {
          setFilteredAnnouncements(newFiltered);
        }
      }
    }
  };

  const filteringPriceKm = (kmMin, kmMax, priceMin, priceMax) => {
    let listFiltered = announcements;
    if (filteredAnnouncements.length > 0) {
      listFiltered = filteredAnnouncements;
    }
    if (kmMin != "") {
      const newFiltered = listFiltered.filter((elem) => elem.odometer >= kmMin);
      listFiltered = newFiltered;
      setIsFiltered(true);
    }
    if (kmMax != "") {
      const newFiltered = listFiltered.filter((elem) => elem.odometer <= kmMax);
      listFiltered = newFiltered;
      setIsFiltered(true);
    }
    if (priceMin != "") {
      const newFiltered = listFiltered.filter((elem) => elem.price >= priceMin);
      listFiltered = newFiltered;
      setIsFiltered(true);
    }
    if (priceMax != "") {
      const newFiltered = listFiltered.filter((elem) => elem.price <= priceMax);
      listFiltered = newFiltered;
      setIsFiltered(true);
    }

    setFilteredAnnouncements(listFiltered);
  };

  const setPageRender = (str) => {
    if (str == "next") {
      setPage(page + 1)
    } else {
      setPage(page - 1)
    }
  }

  return (
    <Flex h={"max-content"} w={"100%"}>
      <Header />
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
            <NavFilters
              filtering={filtering}
              filteringPriceKm={filteringPriceKm}
              setFilteredAnnouncements={setFilteredAnnouncements}
              setIsFiltered={setIsFiltered}
              isFiltered={isFiltered}
              brands={brands}
              models={models}
              colors={colors}
              years={years}
              fuels={fuels}
            />
          </Box>
          <Flex
            wrap={{ base: "nowrap", md: "wrap" }}
            w={"100%"}
            h={"100%"}
            alignContent={"flex-end"}
            mt={"1rem"}
            overflowX={{ base: "auto", md: "hidden" }}
          >
            {" "}
            {filteredAnnouncements.length > 0
              ? filteredAnnouncements.map((advertisement) => (
                <Flex
                  key={advertisement.id}
                  w={{ base: "100%", md: "50%", xl: "33%" }}
                  flexDirection={"row"}
                  justifyContent={"flex-end"}
                  mb={"2rem"}
                  minW={"33%"}
                >
                  <CardAdvertisement
                    key={advertisement.id}
                    id={advertisement.id}
                    title={advertisement.model}
                    description={advertisement.description}
                    owner={advertisement.user.fullName}
                    km={advertisement.odometer}
                    year={advertisement.year}
                    price={advertisement.price.toString()}
                    image={advertisement.images[0]?.img}
                    isGoodBuy={advertisement.isPublished}
                    isActive={true}
                    isHomePage={true}
                  />
                </Flex>
              ))
              : !!announcements.length &&
              isActiveAnnounce.map((advertisement) => (
                <Flex
                  key={advertisement.id}
                  w={{ base: "100%", md: "50%", xl: "33%" }}
                  justifyContent={"flex-end"}
                  mb={"2rem"}
                >
                  <CardAdvertisement
                    key={advertisement.id}
                    id={advertisement.id}
                    title={advertisement.model}
                    description={advertisement.description}
                    owner={advertisement.user.fullName}
                    km={advertisement.odometer}
                    year={advertisement.year}
                    price={advertisement.price.toString()}
                    image={advertisement.images[0]?.img}
                    isGoodBuy={advertisement.isPublished}
                    isActive={true}
                    isHomePage={true}
                  />
                </Flex>
              ))}
          </Flex>
        </Flex>

        <ModalNavFilter
          filtering={filtering}
          filteringPriceKm={filteringPriceKm}
          setFilteredAnnouncements={setFilteredAnnouncements}
          setIsFiltered={setIsFiltered}
          isFiltered={isFiltered}
          brands={brands}
          models={models}
          colors={colors}
          years={years}
          fuels={fuels}
        />

        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w={"100%"}
          marginY={"2rem"}
          gap={{ base: "1rem", md: "2rem" }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Button
            color={"brand.2"}
            textStyle={"heading_5_600"}
            variant={"link"}
            isDisabled={!previusPage}
            onClick={() => setPageRender("prev")}
          >
            {"< Anterior"}
          </Button>
          <Text textStyle={"heading_5_600"} color={"grey.3"}>
            {page} de {totalPages}
          </Text>
          <Button
            color={"brand.2"}
            textStyle={"heading_5_600"}
            variant={"link"}
            isDisabled={!nextPage}
            onClick={() => setPageRender("next")}
          >
            {"Seguinte >"}
          </Button>
        </Flex>
      </Box>
      <Footer />
    </Flex>
  );
};
