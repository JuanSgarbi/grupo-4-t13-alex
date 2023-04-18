import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

export const LoginUser = () => {
  return (
    <Flex
      h={{ base: "max-content", md: "100vh" }}
      bg={"grey.8"}
      justifyContent={"center"}
    >
      <Header user="Juan Sgarbi" />
      <Flex
        p={"44px 48px"}
        mt={"150px"}
        mb={{ base: "220px", md: "150px" }}
        borderRadius={"4px"}
        bg={"whiteFixed"}
        h={"max-content"}
        w={{ base: "95%", md: "500px" }}
        direction={"column"}
        gap={"1.5rem"}
      >
        <Text textStyle={"heading_5_500"}>Login</Text>

        <form>
          <FormControl mt={"1rem"}>
            <FormLabel textStyle={"input_label"}>Usuário</FormLabel>
            <Input
              placeholder="Digitar usuário"
              focusBorderColor="brand.1"
              textStyle={"input_placeholder"}
            />
          </FormControl>

          <FormControl mt={"1rem"}>
            <FormLabel textStyle={"input_label"}>Senha</FormLabel>
            <Input
              placeholder="Digitar senha"
              focusBorderColor="brand.1"
              textStyle={"input_placeholder"}
            />
          </FormControl>

          <Flex mt={4} justifyContent={"flex-end"}>
            <Text textStyle={"body_2_400"}>Esqueci minha senha</Text>
          </Flex>

          <Button mt={"1rem"} type="submit" variant={"default"} w={"100%"}>
            Entrar
          </Button>

          <Flex mt={"1rem"} justifyContent={"center"}>
            <Text textStyle={"body_2_400"}>Ainda não possui conta?</Text>
          </Flex>

          <Button mt={"1rem"} variant={"outline2"} w={"100%"}>
            Cadastrar
          </Button>
        </form>
      </Flex>
      <Footer />
    </Flex>
  );
};
