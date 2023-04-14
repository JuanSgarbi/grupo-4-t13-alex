import {
  Box,
  IconButton,
  Flex,
  useDisclosure,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logoHeader from "../assets/logoHeader.svg";
import { ProfilePic } from "./profilePic";

interface iHeaderProps {
  user: string;
  isLogged?: boolean;
}

export const Header = ({ user, isLogged }: iHeaderProps) => {
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
                  variant={"unstyled"}
                  as={Button}
                  cursor={"pointer"}
                  h={"100%"}
                  border={"none"}
                  borderLeft={"2px solid "}
                  borderColor={"grey.6"}
                  borderRadius={"none"}
                  paddingLeft={"50px"}
                  bg={"grey.10"}
                  _hover={{ bg: "grey.10" }}
                  leftIcon={<ProfilePic user={user} />}
                  textStyle={"body_2_500"}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  {user}
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
              variant={"unstyled"}
              border={"none"}
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
              variant={"unstyled"}
              border={"none"}
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
              bg={"whiteFixed"}
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
          <Box
            position={"absolute"}
            right={5}
            top={"60px"}
            pb={4}
            display={{ md: "none" }}
            bg={"grey.9"}
            p={"20px"}
            borderRadius={"4px"}
          >
            <Flex
              as={"nav"}
              color={"white"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={"20px"}
            >
              <Button variant={"link"}>Fazer Login</Button>
              <Button variant={"outline2"}>Cadastrar</Button>
            </Flex>
          </Box>
        ) : null
      ) : null}
      {isOpen ? (
        isLogged ? (
          <Box
            position={"absolute"}
            right={5}
            top={"60px"}
            h={"max-content"}
            borderRadius={4}
            display={{ base: "flex", md: "none" }}
            flexDirection={"column"}
            bg={"whiteFixed"}
            zIndex={"2"}
          >
            <Button
              bg={"whiteFixed"}
              variant={"link"}
              border={"none"}
              p={"10px"}
            >
              Editar Perfil
            </Button>
            <Button
              bg={"whiteFixed"}
              variant={"link"}
              border={"none"}
              p={"10px"}
            >
              Editar endereço
            </Button>
            <Button
              bg={"whiteFixed"}
              variant={"link"}
              border={"none"}
              p={"10px"}
            >
              Meus anúncios
            </Button>
            <Button
              bg={"whiteFixed"}
              variant={"link"}
              border={"none"}
              p={"10px"}
            >
              Sair
            </Button>
          </Box>
        ) : null
      ) : null}
    </>
  );
};
