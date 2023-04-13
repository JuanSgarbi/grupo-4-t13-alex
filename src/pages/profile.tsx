import { Box, Flex, Text } from "@chakra-ui/layout";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { useContext } from "react";
import { CreateAnnouncementModal } from "../components/createAnnouncementModal";
import { ProfilePic } from "../components/profilePic";


export const Profile = () => {

    return (
        <>
            <Flex
                h={"max-content"}
                w={"100%"}
                bgGradient="linear(to-b, brand.1 600px,grey.8 0%)"
                justifyContent={"center"}>
                <Header user="Felipe Holanda" isLogged={true} />
                <Flex
                    mt={"150px"}
                    mb={{ base: "220px", md: "150px" }}
                    w={{ base: "95%", md: "80%" }}
                    justifyContent={{ base: "unset", md: "space-between" }}
                    direction={{ base: "column", md: "row" }}
                    alignItems={{ base: "center", md: "unset" }}
                    wrap={"wrap"}
                    gap={{ base: "1.5rem", md: "unset" }}
                    h={"1.5rem"}
                >

                    <Flex
                        w={"100%"}
                        direction={"column"}
                        h={"max-content"}
                        margin={"0 auto"}
                        marginBottom={"-100px"}
                        bg={"white"}
                        borderRadius={"md"}
                        padding={"1rem"}
                        gap={"1.5rem"}
                        boxShadow={"md"}
                    >
                        <ProfilePic user={"Felipe Holanda"} isLarge={true} />
                        <Flex
                            direction={"row"}
                            alignItems={"center"}
                            gap={"1rem"}
                        >
                            <Text fontWeight={"bold"}>Felipe Holanda</Text>
                            <Text
                                fontSize={"0.8rem"}
                                fontWeight={"bold"}
                                padding={"0.2rem"}
                                color={"brand.1"}
                                backgroundColor={"brand.4"}
                                borderRadius={".2em"}
                            >Anunciante</Text>
                        </Flex>
                        <Text>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </Text>

                        <Flex
                            width={"30%"}
                        >
                            <CreateAnnouncementModal />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex >
            <Flex
                w={"100%"}
                direction={"row"}
                justifyContent={"space-evenly"}
                wrap={"wrap"}

            >

            </Flex>

        </>
    )
};