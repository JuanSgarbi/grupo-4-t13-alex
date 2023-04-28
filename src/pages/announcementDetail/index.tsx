import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { Image } from "@chakra-ui/image";
import { Button, Textarea, AspectRatio } from "@chakra-ui/react";
import { ProfilePic } from "../../components/profilePic";
import { useAd } from "../../context/announcements.context";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { iAnnouncement } from "../../context/announcements.context";
import { useNavigate } from "react-router-dom";

export const AnnouncementDetail = () => {
  const { id } = useParams();
  const { listAnnouncement } = useAd();
  const navigate = useNavigate();

  const [announcement, setAnnouncement] = useState<iAnnouncement>({} as iAnnouncement);

  useEffect(() => {
    const getAnnouncement = async () => {
      const response = await listAnnouncement(id);
      console.log(response);
      setAnnouncement(response);
    };
    getAnnouncement();
  }, []);

  return (
    <>
      <Flex
        h={"max-content"}
        w={"100%"}
        bgGradient="linear(to-b, brand.1 600px,grey.8 0%)"
        justifyContent={"center"}
      >
        <Header />
        <Flex
          mt={"150px"}
          mb={{ base: "220px", md: "150px" }}
          w={{ base: "95%", md: "80%" }}
          justifyContent={{ base: "unset", md: "space-between" }}
          direction={{ base: "column", md: "row" }}
          alignItems={{ base: "center", md: "unset" }}
          wrap={"wrap"}
          gap={{ base: "1.5rem", md: "unset" }}
          h={"max-content"}
        >
          <Flex
            direction={"column"}
            gap={"1.5rem"}
            w={{ base: "95%", md: "65%" }}
          >
            <Flex
              w={"100%"}
              h={"350px"}
              bg={"grey.10"}
              borderRadius={"4px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image
                w={"80%"}
                h={"80%"}
                maxW={"540px"}
                maxH={"280px"}
                objectFit={{ base: "cover", md: "unset" }}
                src={announcement.images && announcement.images[0].img}
              />
            </Flex>
            <Flex
              w={"100%"}
              bg={"grey.10"}
              borderRadius={"4px"}
              py="28px"
              px="44px"
              direction={"column"}
              gap={"2rem"}
            >
              <Text textStyle={"heading_6_600"}>
                {announcement.brand} {announcement.model}
              </Text>
              <Flex
                justifyContent={"space-between"}
                alignItems={{ base: "unset", md: "center" }}
                direction={{ base: "column", md: "row" }}
                gap={{ base: "2rem", md: "unset" }}
              >
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  w={"110px"}
                >
                  <Text
                    textStyle={"body_2_500"}
                    p={"8px"}
                    bg={"brand.4"}
                    color={"brand.1"}
                    borderRadius={"4px"}
                  >
                    {announcement.year}
                  </Text>
                  <Text
                    textStyle={"body_2_500"}
                    p={"8px"}
                    bg={"brand.4"}
                    color={"brand.1"}
                    borderRadius={"4px"}
                  >
                    {announcement.odometer}KM
                  </Text>
                </Flex>
                <Text textStyle={"heading_7_500"}>R${announcement.price}</Text>
              </Flex>
              <Box>
                <Button variant={"default"}>Comprar</Button>
              </Box>
            </Flex>
            <Flex
              w={"100%"}
              bg={"grey.10"}
              borderRadius={"4px"}
              py="36px"
              px="44px"
              direction={"column"}
              gap={"2rem"}
            >
              <Text textStyle={"heading_6_600"}>Descrição</Text>
              <Text textStyle={"body_1_400"}>{announcement.description}</Text>
            </Flex>
          </Flex>
          <Flex
            w={{ base: "95%", md: "30%" }}
            maxW={{ base: "95%", md: "430px" }}
            direction={"column"}
            gap={4}
          >
            <Flex
              h={"max-content"}
              bg={"grey.10"}
              borderRadius={"4px"}
              py="36px"
              px="30px"
              direction={"column"}
              gap={2}
            >
              <Text textStyle={"heading_6_600"}>Fotos</Text>
              <Flex wrap={"wrap"} gap={2}>
                {announcement.images?.map((img) => (
                  <AspectRatio key={img.id} ratio={1} w={"100px"} h={"100px"}>
                    <Image w={"60%"} objectFit="contain" src={img.img} />
                  </AspectRatio>
                ))}
              </Flex>
            </Flex>
            <Flex
              bg={"grey.10"}
              borderRadius={"4px"}
              py="36px"
              px="44px"
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={4}
            >
              <ProfilePic user="Danilo Cardoso" isLarge={true} />
              <Text textStyle={"heading_6_600"}>{announcement.user && announcement.user.fullName}</Text>
              <Text textStyle={"body_1_400"}>
                {announcement.user && announcement.user.bio}
              </Text>
              <Button variant={"grey1"} size={"medium"} onClick={()=> navigate(`/users/${announcement.user.id}`)}>
                Ver todos anúncios
              </Button>
            </Flex>
          </Flex>

          <Flex direction={"column"} w={{ base: "95%", md: "65%" }}>
            <Flex
              bg={"grey.10"}
              borderRadius={"4px"}
              py="36px"
              px="44px"
              mt={{ base: "unset", md: "1.5rem" }}
              direction={"column"}
              gap={"2rem"}
            >
              <Text textStyle={"heading_6_600"}>Comentários</Text>
              <Flex direction={"column"} gap={"1rem"}>
                <Flex>
                  <Flex flex="1" gap="4" alignItems="center">
                    <ProfilePic user="Juan Sgarbi" isLarge={false} />

                    <Flex>
                      <Text textStyle={"body_2_500"}>Juan Sgarbi</Text>
                      <Text ml={"2"} textStyle={"body_2_400"} color={"grey.3"}>
                        •
                      </Text>
                      <Text ml={"2"} textStyle={"body_2_400"} color={"grey.3"}>
                        há 3 dias
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
                  dolorem, ipsum molestias illo veritatis alias explicabo
                  architecto suscipit, in ullam sunt repellendus expedita quod
                  cum facilis quaerat corrupti iste nostrum?
                </Text>
              </Flex>

              <Flex direction={"column"} gap={"1rem"}>
                <Flex>
                  <Flex flex="1" gap="4" alignItems="center">
                    <ProfilePic user="Danilo Cardoso" isLarge={false} />

                    <Flex>
                      <Text textStyle={"body_2_500"}>Danilo Cardoso</Text>
                      <Text ml={"2"} textStyle={"body_2_400"} color={"grey.3"}>
                        •
                      </Text>
                      <Text ml={"2"} textStyle={"body_2_400"} color={"grey.3"}>
                        há 2 semanas
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
                  dolorem, ipsum molestias illo veritatis alias explicabo
                  architecto suscipit, in ullam sunt repellendus expedita quod
                  cum facilis quaerat corrupti iste nostrum?
                </Text>
              </Flex>

              <Flex direction={"column"} gap={"1rem"}>
                <Flex>
                  <Flex flex="1" gap="4" alignItems="center">
                    <ProfilePic user="Gabriel Ogawa" isLarge={false} />

                    <Flex>
                      <Text textStyle={"body_2_500"}>Gabriel Ogawa</Text>
                      <Text ml={"2"} textStyle={"body_2_400"} color={"grey.3"}>
                        •
                      </Text>
                      <Text ml={"2"} textStyle={"body_2_400"} color={"grey.3"}>
                        há 1 mês
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
                  dolorem, ipsum molestias illo veritatis alias explicabo
                  architecto suscipit, in ullam sunt repellendus expedita quod
                  cum facilis quaerat corrupti iste nostrum?
                </Text>
              </Flex>
            </Flex>
            <Flex
              bg={"grey.10"}
              borderRadius={"4px"}
              py="36px"
              px="44px"
              mt={{ base: "unset", md: "1.5rem" }}
              direction={"column"}
              gap={"2rem"}
            >
              <Flex alignItems={"center"} gap={4}>
                <ProfilePic user="Juan Sgarbi" isLarge={false} />
                <Text textStyle={"body_2_500"}>Juan Sgarbi</Text>
              </Flex>
              <Box
                position={"relative"}
                border={"1.5px solid"}
                borderColor={"grey.7"}
                borderRadius={"4px"}
                h={"170px"}
              >
                <Textarea
                  resize={"none"}
                  focusBorderColor="transparent"
                  borderColor={"transparent"}
                  w={"100%"}
                  placeholder="Carro muito confortável, foi uma ótima experiência de compra..."
                />
                <Button
                  position={"absolute"}
                  bottom={2}
                  right={2}
                  variant={"default"}
                >
                  Comentar
                </Button>
              </Box>
              <Flex gap={2} wrap={"wrap"}>
                <Button
                  variant={"unset"}
                  borderColor={"grey.7"}
                  color={"grey.3"}
                  fontFamily={"Inter"}
                  fontWeight={"500"}
                  fontSize={"12px"}
                  lineHeight={2}
                  bg={"grey.7"}
                  p={"0 12px"}
                  borderRadius={"24px"}
                >
                  Gostei muito!
                </Button>
                <Button
                  variant={"unset"}
                  borderColor={"grey.7"}
                  color={"grey.3"}
                  fontFamily={"Inter"}
                  fontWeight={"500"}
                  fontSize={"12px"}
                  lineHeight={2}
                  bg={"grey.7"}
                  p={"0 12px"}
                  borderRadius={"24px"}
                >
                  Incírivel
                </Button>
                <Button
                  variant={"unset"}
                  borderColor={"grey.7"}
                  color={"grey.3"}
                  fontFamily={"Inter"}
                  fontWeight={"500"}
                  fontSize={"12px"}
                  lineHeight={2}
                  bg={"grey.7"}
                  p={"0 12px"}
                  borderRadius={"24px"}
                >
                  Recomendarei para meus amigos!
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Footer />
      </Flex>
    </>
  );
};
