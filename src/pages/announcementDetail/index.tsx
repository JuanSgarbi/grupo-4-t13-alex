import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { Image } from "@chakra-ui/image";
import { Button, Textarea, AspectRatio, Spinner } from "@chakra-ui/react";
import { ProfilePic } from "../../components/profilePic";
import { useAd } from "../../context/announcements.context";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { iAnnouncementDetail } from "../../context/announcements.context";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/user.context";
import { EditDeleteComment } from "../../components/editDeleteCommentModal";

export const AnnouncementDetail = () => {
  const { id } = useParams();
  const { listAnnouncement, createComment } = useAd();
  const { isLogged, user } = useUser();
  const [commentValue, setCommentValue] = useState("");
  const navigate = useNavigate();
  const [resetAnnounce, setResetAnnounce] = useState(0);
  const [announcement, setAnnouncement] = useState<iAnnouncementDetail | null>(
    null
  );

  const getAnnouncement = async () => {
    const response = await listAnnouncement(id);
    setAnnouncement(response);
  };
  useEffect(() => {
    getAnnouncement();
  }, [resetAnnounce]);

  const tempoDecorrido = (dataString: string) => {
    const data = new Date(dataString);
    const agora = Date.now();
    const diff = agora - data.getTime();
    const umDia = 24 * 60 * 60 * 1000;

    const anos = Math.floor(diff / (365 * umDia));
    if (anos > 1) {
      return `Há ${anos} anos`;
    }
    if (anos == 1) {
      return `Há ${anos} ano`;
    }

    const meses = Math.floor(diff / (30 * umDia));
    if (meses > 1) {
      return `Há ${meses} meses`;
    }
    if (meses == 1) {
      return `Há ${meses} mês`;
    }

    const semanas = Math.floor(diff / (7 * umDia));
    if (semanas > 1) {
      return `Há ${semanas} semanas`;
    }
    if (semanas == 1) {
      return `Há ${semanas} semana`;
    }

    const dias = Math.floor(diff / umDia);
    if (dias > 1) {
      return `Há ${dias} dias`;
    }
    if (dias == 1) {
      return `Há ${dias} dia`;
    }

    return "Hoje";
  };

  const sendWpp = () => {
    console.log(user);
    let numero = announcement.user.cellphone.replace(/\D/g, "");
    let str = `https://api.whatsapp.com/send?phone=55${numero}&text=Oi,%20tudo%20bem?`;
    return str;
  };

  const comment = () => {
    createComment({ description: commentValue }, id);
    setTimeout(() => {
      getAnnouncement();
    }, 1500);
    setCommentValue("");
  };

  return (
    <>
      {announcement ? (
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
                    gap={3}
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
                  <Text textStyle={"heading_7_500"}>
                    R${announcement.price},00
                  </Text>
                </Flex>
                <Box>
                  {isLogged ? (
                    <Link to={sendWpp()} target={"_blank"}>
                      <Button variant={"default"}>Comprar</Button>
                    </Link>
                  ) : (
                    <Button
                      variant={"brandDisable"}
                      onClick={() => navigate("/login")}
                    >
                      Comprar
                    </Button>
                  )}
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
                {announcement.user && (
                  <ProfilePic
                    user={announcement.user.fullName}
                    isLarge={true}
                  />
                )}

                <Text textStyle={"heading_6_600"}>
                  {announcement.user && announcement.user.fullName}
                </Text>
                <Text textStyle={"body_1_400"}>
                  {announcement.user && announcement.user.bio}
                </Text>
                <Button
                  variant={"grey1"}
                  size={"medium"}
                  onClick={() => navigate(`/users/${announcement.user.id}`)}
                >
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
                {announcement.comments && announcement.comments.length > 0 ? (
                  <>
                    {announcement.comments.map((el) => {
                      return (
                        <Flex
                          direction={"column"}
                          gap={"1rem"}
                          position={"relative"}
                        >
                          {user && el.user.id === user.id && (
                            <EditDeleteComment
                              id={el.id}
                              setResetAnnounce={setResetAnnounce}
                              resetAnnounce={resetAnnounce}
                            />
                          )}

                          <Flex>
                            <Flex flex="1" gap="4" alignItems="center">
                              <ProfilePic
                                user={el.user.fullName}
                                isLarge={false}
                              />

                              <Flex>
                                <Text textStyle={"body_2_500"}>
                                  {el.user.fullName}
                                </Text>
                                <Text
                                  ml={"2"}
                                  textStyle={"body_2_400"}
                                  color={"grey.3"}
                                >
                                  •
                                </Text>
                                <Text
                                  ml={"2"}
                                  textStyle={"body_2_400"}
                                  color={"grey.3"}
                                >
                                  {tempoDecorrido(el.createdAt)}
                                </Text>
                              </Flex>
                            </Flex>
                          </Flex>
                          <Text>{el.description}</Text>
                        </Flex>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <Text textStyle={"body_2_500"}>
                      Este anúncio ainda não possui nenhum comentário, envie o
                      primeiro!
                    </Text>
                  </>
                )}
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
                  {isLogged && (
                    <>
                      <ProfilePic user={user.fullName} isLarge={false} />
                      <Text textStyle={"body_2_500"}>{user.fullName}</Text>
                    </>
                  )}
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
                    onChange={(e) => setCommentValue(e.target.value)}
                    value={commentValue}
                  />
                  <Button
                    position={"absolute"}
                    bottom={2}
                    right={2}
                    variant={isLogged ? "default" : "brandDisable"}
                    onClick={
                      isLogged ? () => comment() : () => navigate("/login")
                    }
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
                    onClick={() => setCommentValue("Gostei muito!")}
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
                    onClick={() => setCommentValue("Incírivel")}
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
                    onClick={() =>
                      setCommentValue("Recomendarei para meus amigos!")
                    }
                  >
                    Recomendarei para meus amigos!
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Footer />
        </Flex>
      ) : (
        <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
    </>
  );
};
