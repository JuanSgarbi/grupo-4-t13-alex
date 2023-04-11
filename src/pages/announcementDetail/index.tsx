import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { Image } from "@chakra-ui/image";
import { Button } from "@chakra-ui/react";

export const AnnouncementDetail = () => {
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
                src="https://media.seudinheiro.com/uploads/2023/01/Blazer-EV-foto-Chevrolet.jpg"
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
                TRACKER PREMIER 1.2 TURBO AT 2021
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
                    2023
                  </Text>
                  <Text
                    textStyle={"body_2_500"}
                    p={"8px"}
                    bg={"brand.4"}
                    color={"brand.1"}
                    borderRadius={"4px"}
                  >
                    O KM
                  </Text>
                </Flex>
                <Text textStyle={"heading_7_500"}>R$130.000,00</Text>
              </Flex>
              <Box>
                <Button variant={"brandDisable"}>Comprar</Button>
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
              <Text textStyle={"body_1_400"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
                fugit dolore sit minima odit nihil, vitae accusantium, porro
                neque quasi, quaerat quidem mollitia. Corporis quam quaerat
                debitis possimus, ullam excepturi.Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Libero fugit dolore sit minima
                odit nihil, vitae accusantium, porro neque quasi, quaerat quidem
                mollitia. Corporis quam quaerat debitis possimus, ullam
                excepturi.Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Libero fugit dolore sit minima odit nihil, vitae
                accusantium, porro neque quasi, quaerat quidem mollitia.
                Corporis quam quaerat debitis possimus, ullam excepturi.Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Libero fugit
                dolore sit minima odit nihil, vitae accusantium, porro neque
                quasi, quaerat quidem mollitia. Corporis quam quaerat debitis
                possimus, ullam excepturi.
              </Text>
            </Flex>
          </Flex>
          <Flex
            w={{ base: "95%", md: "30%" }}
            h={"350px"}
            bg={"grey.10"}
            borderRadius={"4px"}
            py="36px"
            px="44px"
          >
            <Text textStyle={"heading_6_600"}>Fotos</Text>
            {/* <Image src="https://jorlan.com/bh/uploads/products/versions/chevrolet-tracker-turboltz12-vermelho-carmim-min.png" />
            <Image src="https://www.autodashboard.com.br/wp-content/uploads/2020/04/novo-tracker-pcd-2021.jpg" />
            <Image src="https://vitalliveiculos.com.br/wp-content/uploads/2022/09/DSC_0008-1280x848-1.jpg" />
            <Image src="https://www.automaistv.com.br/wp-content/uploads/2022/07/Chevrolet-Tracker-Premier-9_edited-990x594.jpg" />
            <Image src="https://cdn.salaodocarro.com.br/_upload/carros/2021/08/13/chevrolet-tracker-2022-vermelho-254351-0.jpg" />
            <Image src="https://www.autoo.com.br/fotos/2022/4/1280_960/interiortracker1_28042022_71323_1280_960.jpg" /> */}
          </Flex>
          <Flex direction={"column"} w={{ base: "95%", md: "65%" }}>
            <Flex
              bg={"grey.10"}
              borderRadius={"4px"}
              py="36px"
              px="44px"
              mt={{ base: "unset", md: "1.5rem" }}
            >
              <Text textStyle={"heading_6_600"}>Comentários</Text>
            </Flex>
            <Flex></Flex>
          </Flex>
        </Flex>

        <Footer />
      </Flex>
    </>
  );
};
