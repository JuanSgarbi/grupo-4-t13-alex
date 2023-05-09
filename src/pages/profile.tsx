import { Box, Flex, Text } from "@chakra-ui/layout";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { useEffect, useState } from "react";
import { CreateAnnouncementModal } from "../components/createAnnouncementModal";
import { ProfilePic } from "../components/profilePic";
import { CardAdvertisement } from "../components/cardAdvertisement";
import { useUser } from "../context/user.context";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { iAnnouncement, useAd } from "../context/announcements.context";

export const Profile = () => {
  const { user, isLogged } = useUser();
  const { announcements } = useAd();
  const [myAnnouncements, setMyAnnouncements] = useState<iAnnouncement[]>([]);

  useEffect(() => {
    const filteredAnnouncements = announcements.filter(
      (el) => el.user.id === user.id
    );
    setMyAnnouncements(filteredAnnouncements);
  }, [announcements]);

  return (
    <>
      {user && isLogged ? (
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
                <ProfilePic user={user.fullName} isLarge={true} />
                <Flex direction={"row"} alignItems={"center"} gap={"1rem"}>
                  <Text fontWeight={"bold"}>{user.fullName}</Text>

                  {user.isAdvertiser ? (
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
                  ) : (
                    <Text
                      fontSize={"0.8rem"}
                      fontWeight={"bold"}
                      padding={"0.2rem"}
                      color={"brand.1"}
                      backgroundColor={"brand.4"}
                      borderRadius={".2em"}
                    >
                      Comprador
                    </Text>
                  )}
                </Flex>
                <Text>{user.bio}</Text>

                {user.isAdvertiser && (
                  <Flex width={"30%"}>
                    <CreateAnnouncementModal />
                  </Flex>
                )}
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
                gap={"1.5rem"}
                direction={"row"}
                w={"100%"}
                justifyContent={"stretch"}
                mb={{ base: "220px", md: "150px" }}
              >
                {myAnnouncements.length > 0 ? (
                  myAnnouncements.map((ad): JSX.Element => {
                    return (
                      <CardAdvertisement
                        key={ad.id}
                        id={ad.id}
                        title={`${ad.brand} ${ad.model}`}
                        description={ad.description}
                        km={ad.odometer}
                        isActive={ad.isPublished}
                        owner={user.fullName}
                        price={`${ad.price}`}
                        isHomePage={false}
                        image={ad.images[0]?.img}
                        isGoodBuy={ad.price <= ad.fipe ? true : false}
                        year={ad.year}
                      />
                    );
                  })
                ) : (
                  <Flex
                    w={"100%"}
                    h={"500px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Text>Você não possui anúncios</Text>
                  </Flex>
                )}
              </Flex>
            </Box>
            <Footer />
          </Flex>
        </>
      ) : (
        <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
    </>
  );
};
