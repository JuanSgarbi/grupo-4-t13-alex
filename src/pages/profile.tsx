import { Box, Flex, Text } from "@chakra-ui/layout";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { useContext } from "react";
import { CreateAnnouncementModal } from "../components/createAnnouncementModal";
import { ProfilePic } from "../components/profilePic";
import { AdContext } from "../context/announcements.context";
import { CardAdvertisement } from "../components/cardAdvertisement";

export const Profile = () => {
  const { profileAnnouncements } = useContext(AdContext);

  return (
    <>
      <Flex
        h={"max-content"}
        w={"100%"}
        bgGradient="linear(to-b, brand.1 400px,grey.8 0%)"
        justifyContent={"center"}
        direction={"column"}
        alignItems={"center"}
      >
        <Header />
        <Flex
          mt={"182px"}
          w={{ base: "95%", md: "80%" }}
          h={"max-content"}
          justifyContent={{ base: "unset", md: "space-between" }}
          direction={"column"}
          alignItems={{ base: "center", md: "unset" }}
          gap={{ base: "1.5rem", md: "2rem" }}
        >
          <Flex
            h={"max-content"}
            w={"100%"}
            direction={"column"}
            bg={"white"}
            borderRadius={"md"}
            padding={"2rem"}
            gap={"1.5rem"}
            boxShadow={"md"}
          >
            <ProfilePic user={"Felipe Holanda"} isLarge={true} />
            <Flex direction={"row"} alignItems={"center"} gap={"1rem"}>
              <Text fontWeight={"bold"}>Felipe Holanda</Text>
              <Text
                fontSize={"0.8rem"}
                fontWeight={"bold"}
                padding={"0.2rem"}
                color={"brand.1"}
                backgroundColor={"brand.4"}
                borderRadius={".2em"}
              >
                Anunciante
              </Text>
            </Flex>
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </Text>

            <Flex width={"30%"}>
              <CreateAnnouncementModal />
            </Flex>
          </Flex>
          <Flex
            w={"100%"}
            direction={"row"}
            justifyContent={"space-evenly"}
            wrap={"wrap"}
          ></Flex>
        </Flex>
        <Box w={"95%"}>
          <Flex
            wrap={"wrap"}
            gap={"1rem"}
            direction={"row"}
            justifyContent={"space-between"}
            mb={{ base: "220px", md: "150px" }}
          >
            {profileAnnouncements.length > 0 ? (
              profileAnnouncements.map((ad): JSX.Element => {
                return (
                  <CardAdvertisement
                    key={ad.id}
                    id={ad.id}
                    title={`${ad.brand} ${ad.model}`}
                    description={ad.description}
                    km={ad.odometer}
                    isActive={ad.isPublished}
                    owner={"Felipe Holanda"}
                    price={`${ad.price}`}
                    isHomePage={false}
                    image={ad.images[0]?.img}
                    isGoodBuy={ad.price <= ad.fipe ? true : false}
                    year={ad.year}
                  />
                );
              })
            ): (
              <Flex
                w={"100%"}
                h={"100px"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text>Nenhum anúncio encontrado</Text>
              </Flex>
            )}
          </Flex>
        </Box>
        <Footer />
      </Flex>
    </>
  );
};
