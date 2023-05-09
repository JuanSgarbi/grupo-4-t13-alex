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
import { useParams } from "react-router-dom";
import { IUser } from "../context/user.context";

export const Users = () => {
  const { user, getProfile } = useUser();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<IUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) navigate(-1);
    if (user && user.id === id) navigate("/profile");
    getProfile(id).then((res) => {
      setUserProfile(res);
      setIsLoaded(true);
    });
  }, []);

  return (
    <>
      {userProfile && isLoaded ? (
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
                <ProfilePic user={userProfile.fullName} isLarge={true} />
                <Flex direction={"row"} alignItems={"center"} gap={"1rem"}>
                  <Text fontWeight={"bold"}>{userProfile.fullName}</Text>
                  {userProfile.isAdvertiser === true ? (
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
                <Text>{userProfile.bio}</Text>
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
                {userProfile.isAdvertiser ? (
                  userProfile.announcements.length > 0 ? (
                    userProfile.announcements.map((ad): JSX.Element => {
                      return (
                        <CardAdvertisement
                          key={ad.id}
                          id={ad.id}
                          title={`${ad.brand} ${ad.model}`}
                          description={ad.description}
                          km={ad.odometer}
                          isActive={ad.isPublished}
                          owner={userProfile.fullName}
                          price={`${ad.price}`}
                          isHomePage={true}
                          image={ad.images[0]?.img}
                          isGoodBuy={ad.price <= ad.fipe ? true : false}
                          year={ad.year}
                        />
                      );
                    })
                  ) : (
                    <Flex
                      w={"100%"}
                      h={"100px"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Text>Nenhum anúncio encontrado</Text>
                    </Flex>
                  )
                ) : (
                  <Flex
                    w={"100%"}
                    h={"500px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Text>Este usuário não é um anunciante.</Text>
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
