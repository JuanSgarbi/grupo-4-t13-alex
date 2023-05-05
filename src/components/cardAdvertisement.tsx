import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { EditAnnouncementModal } from "./editAnnouncementModal";
import { useNavigate } from "react-router-dom";
import { ProfilePic } from "./profilePic";

export interface iCardProps {
  id?: string;

  title: string;
  description: string;
  owner: string;
  km: string;
  year: string;
  price: string;
  image: string;
  isGoodBuy: boolean;
  isActive: boolean;
  isHomePage: boolean;
}

export const CardAdvertisement = ({
  id,
  title,
  description,
  owner,
  km,
  year,
  price,
  image,
  isGoodBuy,
  isActive,
  isHomePage,
}: iCardProps) => {
  const navigate = useNavigate();

  const handleClickCard = () => {
    if (isHomePage) {
      navigate(`/announcement/${id}`);
    }
  };

  const handleClickButton = () => {
    navigate(`/announcement/${id}`);
  };
  return (
    <>
      <Card
        maxW="350px"
        cursor={"pointer"}
        onClick={handleClickCard}
        boxShadow="none"
        w={{ base: "300px", md: "100%" }}
      >
        <CardBody>
          <Box position={"relative"}>
            <Image
              src={image}
              alt="Green double couch with wooden legs"
              border={"2px solid transparent"}
              borderRadius={"2px"}
              marginBottom={"16px"}
              transition={"border 0.5s ease"}
              _hover={{ borderColor: "brand.1" }}
            />

            {isHomePage ? (
              isGoodBuy ? (
                <Text
                  position={"absolute"}
                  top={"2px"}
                  right={"2px"}
                  color={"whiteFixed"}
                  bg={"random.7"}
                  paddingRight={"2.5px"}
                  paddingLeft={"2.5px"}
                  borderRadius={"2px"}
                >
                  $
                </Text>
              ) : null
            ) : null}
            {!isHomePage ? (
              isActive ? (
                <Text
                  position={"absolute"}
                  top={"8px"}
                  left={"8px"}
                  color={"whiteFixed"}
                  bg={"brand.1"}
                  p={"0px 6px"}
                  textStyle={"body_2_500"}
                >
                  Ativo
                </Text>
              ) : null
            ) : null}
            {!isHomePage ? (
              !isActive ? (
                <Text
                  position={"absolute"}
                  top={"8px"}
                  left={"8px"}
                  color={"whiteFixed"}
                  bg={"grey.4"}
                  p={"0px 6px"}
                  textStyle={"body_2_500"}
                >
                  Inativo
                </Text>
              ) : null
            ) : null}
          </Box>
          <Stack spacing="16px">
            <Heading size="md">{title}</Heading>
            <Text noOfLines={2}>{description}</Text>
          </Stack>
        </CardBody>
        <CardFooter paddingTop={"0"}>
          <Box w={"100%"}>
            <Flex gap={"8px"} alignItems={"center"} marginBottom={"16px"}>
              <ProfilePic user={owner} isLarge={false} />

              <Text>{owner}</Text>
            </Flex>
            <Flex justifyContent={"space-between"} w={"100%"}>
              <Flex gap={"12px"}>
                <Text
                  bg={"brand.4"}
                  borderRadius={"4px"}
                  padding={"4px 8px"}
                  color={"brand.1"}
                  textStyle={"body_2_500"}
                >
                  {km} KM
                </Text>
                <Text
                  bg={"brand.4"}
                  borderRadius={"4px"}
                  padding={"4px 8px"}
                  color={"brand.1"}
                  textStyle={"body_2_500"}
                >
                  {year}
                </Text>
              </Flex>
              <Text textStyle={"heading_7_500"}>R$ {price},00</Text>
            </Flex>
            {!isHomePage ? (
              <Flex marginTop={"15px"} gap={"15px"} w={"100%"}>
                <EditAnnouncementModal idAnnouncement={id} />
                <Button
                  variant={"outline1"}
                  size={{ base: "medium", md: "big" }}
                  onClick={handleClickButton}
                >
                  Ver detalhes
                </Button>
              </Flex>
            ) : null}
          </Box>
        </CardFooter>
      </Card>
    </>
  );
};
