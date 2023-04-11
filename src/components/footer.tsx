import { IconButton, Text, Flex } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import logoFooter from "../assets/logoFooter.svg";

export const Footer = () => {
  return (
    <Flex
      position={"absolute"}
      bottom={"0"}
      w={"100%"}
      h={{ base: "200px", md: "100px" }}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={{ md: "50px" }}
      paddingTop={{ base: "40px" }}
      paddingBottom={{ base: "40px" }}
      bg={"grey.0"}
      flexDirection={{ base: "column", md: "row" }}
      gap={{ base: "25px", md: "0px" }}
    >
      <img src={logoFooter} />
      <Text
        color={"whiteFixed"}
        textStyle={"body_2_400"}
        w={"100%"}
        textAlign={"center"}
      >
        © 2022 - Todos os direitos reservados.
      </Text>
      <IconButton
        aria-label="Up"
        icon={<ChevronUpIcon color={"whiteFixed"} />}
        bg={"grey.1"}
        border={"1px solid transparent"}
        _hover={{ bg: "grey.1", borderColor: "whiteFixed" }}
      />
    </Flex>
  );
};
