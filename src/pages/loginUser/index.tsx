import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useUser } from "../../context/user.context";
import { ForgotPasswordModal } from "../../components/forgotPasswordModal";

interface ILogin {
  email: string;
  password: string;
}

export const LoginUser = () => {
  const [showPassword, setShowpassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { loginUser } = useUser();

  const formSchema = yup.object().shape({
    password: yup.string().required("Este campo é obrigatório"),
    email: yup
      .string()
      .email("Insira um email válido")
      .required("Este campo é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({ resolver: yupResolver(formSchema) });

  return (
    <Flex
      h={{ base: "max-content", md: "100vh" }}
      bg={"grey.8"}
      justifyContent={"center"}
    >
      <Header />
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

        <form onSubmit={handleSubmit(loginUser)}>
          <FormControl mt={"1rem"} isInvalid={errors.email ? true : false}>
            <FormLabel textStyle={"input_label"}>Usuário</FormLabel>
            <Input
              placeholder="Ex: mail@mail.com"
              focusBorderColor="brand.1"
              textStyle={"input_placeholder"}
              {...register("email")}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mt={"1rem"} isInvalid={errors.password ? true : false}>
            <FormLabel textStyle={"input_label"}>Senha</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Digitar senha"
                focusBorderColor="brand.1"
                textStyle={"input_placeholder"}
                {...register("password")}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <InputRightElement>
                <Button
                  variant="ghost"
                  size={"small"}
                  onClick={() => setShowpassword(!showPassword)}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>

          <Flex mt={4} justifyContent={"flex-end"}>
            <ForgotPasswordModal />
          </Flex>

          <Button mt={"1rem"} type="submit" variant={"default"} w={"100%"}>
            Entrar
          </Button>
        </form>

        <Flex mt={"1rem"} justifyContent={"center"}>
          <Text textStyle={"body_2_400"}>Ainda não possui conta?</Text>
        </Flex>

        <Button mt={"1rem"} variant={"outline2"} w={"100%"}>
          Cadastrar
        </Button>
      </Flex>
      <Footer />
    </Flex>
  );
};
