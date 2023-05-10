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
import { useUser } from "../context/user.context";
import { useNavigate } from "react-router";
import { UpdateUserModal } from "./updateUserModal";
import { UpdateAddressModal } from "./updateAddressModal";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLogged, user, logout } = useUser();
  const navigate = useNavigate();

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
        <img src={logoHeader} onClick={() => navigate("/")} />
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
                  leftIcon={
                    <ProfilePic user={user!.fullName} isLarge={false} />
                  }
                  textStyle={"body_2_500"}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  {user!.fullName}
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <UpdateUserModal />
                  </MenuItem>
                  <MenuItem>
                    <UpdateAddressModal />
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/profile")}>
                    Meus anúncios
                  </MenuItem>
                  <MenuItem onClick={logout}>Sair</MenuItem>
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
              <Button variant={"link"} onClick={() => navigate("/login")}>
                Fazer Login
              </Button>
              <Button
                variant={"outline2"}
                onClick={() => navigate("/register")}
              >
                Cadastrar
              </Button>
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
              <Button variant={"link"} onClick={() => navigate("/login")}>
                Fazer Login
              </Button>
              <Button
                variant={"outline2"}
                onClick={() => navigate("/register")}
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
            position={"absolute"}
            zIndex={"999"}
            right={5}
            top={"60px"}
            h={"max-content"}
            borderRadius={4}
            display={{ base: "flex", md: "none" }}
            flexDirection={"column"}
            gap={3}
            p={3}
            bg={"whiteFixed"}
          >
            <UpdateUserModal />
            <UpdateAddressModal />
            <Button
              variant={"link2"}
              size={"small"}
              onClick={() => navigate("/profile")}
            >
              Meus anúncios
            </Button>
            <Button variant={"link2"} size={"small"} onClick={logout}>
              Sair
            </Button>
          </Box>
        ) : null
      ) : null}
    </>
  );
};
