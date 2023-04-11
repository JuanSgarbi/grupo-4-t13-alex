import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { EditAnnouncementModal } from "./editAnnouncementModal";
import { useNavigate } from 'react-router-dom';
import { ProfilePic } from "./profilePic";

export interface iCardProps{
  title: string;
  description: string;
  owner: string;
  km: string;
  year: string;
  price: string;
  isAdvertiser: boolean;
}

export const CardAdvertisement = ({title, description, owner, km, year, price, isAdvertiser}: iCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/teste');
  }

  return (
    <>
          <Card maxW='312px' cursor={"pointer"} onClick={handleClick} boxShadow="none">
          <CardBody>
            <Box position={"relative"}>
              <Image
                src='https://static.vakinha.com.br/uploads/vakinha/image/712805/fusca-poa.jpg?ims=700x410'
                alt='Green double couch with wooden legs'
                border={"2px solid transparent"}
                borderRadius={"2px"}
                marginBottom={"16px"}
                transition={"border 0.5s ease"} 
                _hover={{borderColor: "brand.1"}}
              />
              <Text position={"absolute"} top={"2px"} right={"2px"} color={"whiteFixed"} bg={"random.7"} paddingRight={"2.5px"} paddingLeft={"2.5px"} borderRadius={"2px"}>$</Text>
            </Box>
            <Stack spacing='16px'>
              <Heading size='md'>{title}</Heading>
              <Text noOfLines={2}>{description}</Text>
            </Stack>
          </CardBody>
          <CardFooter paddingTop={"0"}>
            <Box w={"100%"}>
              <Flex gap={"8px"} alignItems={"center"} marginBottom={"16px"}>
                <ProfilePic user={owner}/>
                <Text>{owner}</Text>
              </Flex>
              <Flex justifyContent={"space-between"} w={"100%"}>
                <Flex gap={"12px"}>
                  <Text bg={"brand.4"} borderRadius={"4px"} padding={"4px 8px"} color={"brand.1"} textStyle={"body_2_500"}>{km} KM</Text>
                  <Text bg={"brand.4"} borderRadius={"4px"} padding={"4px 8px"} color={"brand.1"} textStyle={"body_2_500"}>{year}</Text>
                </Flex>
                <Text textStyle={"heading_7_500"}>R$ {price},00</Text>
              </Flex>
            {
              isAdvertiser ? 
              (
                <Flex marginTop={"30px"} gap={"15px"} w={"100%"}>
                  <EditAnnouncementModal/>
                  <Button variant={"outline1"} size={{base: "medium", md: "big"}}>Ver detalhes</Button>
                </Flex>
              ) : null }
            </Box>
          </CardFooter>
        </Card>
    </>
  )
}