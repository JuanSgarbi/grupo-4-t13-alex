import {
  Box,
  IconButton,
  Text,
  Flex,
  useDisclosure,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logoHeader from "../assets/logoHeader.svg";

interface iHeaderProps {
  name?: string;
  isLogged?: boolean;
}

export const Avatar = () => {
  return (
    <Flex
      bg={"brand.1"}
      w={"25px"}
      h={"25px"}
      borderRadius={"50%"}
      fontSize={{ base: "sm", md: "md" }}
      alignItems={"center"}
      justifyContent={"center"}
      p={{ base: "15px", md: "17px" }}
      color={"whiteFixed"}
    >
      GO
    </Flex>
  );
};

export const Header = ({ name, isLogged }: iHeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        position={"absolute"}
        top={"0"}
        alignItems={"center"}
        w={"100%"}
        h={"80px"}
        borderBottom={"2px solid"}
        borderColor={"grey.6"}
        justifyContent={"space-between"}
        bg={"grey.10"}
        paddingRight={{ base: "10px", md: "50px" }}
        paddingLeft={{ base: "10px", md: "50px" }}
      >
        <img src={logoHeader} />
        {isLogged ? (
          <>
            <Box h={"100%"} display={{ base: "none", md: "flex" }}>
              <Menu>
                <MenuButton
                  as={Button}
                  cursor={"pointer"}
                  h={"100%"}
                  borderLeft={"2px solid"}
                  borderColor={"grey.6"}
                  borderRadius={"none"}
                  paddingLeft={"50px"}
                  bg={"grey10"}
                  _hover={{ bg: "grey10" }}
                  leftIcon={<Avatar />}
                  textStyle={"body_1_400"}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  Gabriel Ogawa
                </MenuButton>
                <MenuList>
                  <MenuItem>Editar Perfil</MenuItem>
                  <MenuItem>Editar endereço</MenuItem>
                  <MenuItem>Meus anúncios</MenuItem>
                  <MenuItem>Sair</MenuItem>
                </MenuList>
              </Menu>
            </Box>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon boxSize={3} /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
              bg={"whiteFixed"}
            />
          </>
        ) : (
          <>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
              bg={"whiteFixed"}
              variant={"unstyled"}
            />
            <HStack
              spacing={8}
              h={"100%"}
              borderLeft={"2px solid"}
              borderColor={"grey.6"}
              display={{ base: "none", md: "flex" }}
              alignItems={"center"}
              paddingLeft={"44px"}
            >
              <Button variant={"link"}>Fazer Login</Button>
              <Button variant={"outline2"}>Cadastrar</Button>
            </HStack>
          </>
        )}
      </Flex>
      {isOpen ? (
        !isLogged ? (
          <Box pb={4} display={{ md: "none" }}>
            <Flex
              as={"nav"}
              color={"white"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={"20px"}
            >
              <Button
                alignSelf={"start"}
                paddingTop={"30px"}
                paddingBottom={"40px"}
              >
                Fazer Login
              </Button>
              <Button
                color={"black"}
                p={"10px"}
                w={"90%"}
                bg={"whiteFixed"}
                border={"1.5px solid"}
                borderColor={"grey4"}
                borderRadius={"4px"}
              >
                Cadastrar
              </Button>
            </Flex>
          </Box>
        ) : null
      ) : null}
      {isOpen ? (
        isLogged ? (
          <Box
            h={"100%"}
            display={{ base: "flex", md: "none" }}
            flexDirection={"column"}
          >
            <Button bg={"whiteFixed"}>Editar Perfil</Button>
            <Button bg={"whiteFixed"}>Editar endereço</Button>
            <Button bg={"whiteFixed"}>Meus anúncios</Button>
            <Button bg={"whiteFixed"}>Sair</Button>
          </Box>
        ) : null
      ) : null}
    </>
  );
};
