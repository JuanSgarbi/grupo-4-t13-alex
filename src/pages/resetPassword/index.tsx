import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { api } from "../../services/axios";

interface IResetPass {
  password: string;
  confirmPassword?: string;
}

export const ResetPassword = () => {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [confpass, setConfpass] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    password: yup
      .string()
      .matches(/[A-Z]/, "Deve conter ao menos 1 letra maiúscula")
      .matches(/[a-z]/, "Deve conter ao menos 1 letra minúscula")
      .matches(/(\d)/, "Deve conter ao menos um número")
      .matches(/(\W)|_/, "Deve conter ao menos um caractere especial")
      .min(8, "Deve conter no mínimo 8 caracteres")
      .required("Este campo é obrigatório"),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        "Confirmação de senha deve ser igual a senha"
      )
      .required("Este campo é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPass>({ resolver: yupResolver(formSchema) });

  const onSubmit = async (data: IResetPass) => {
    delete data.confirmPassword;
    try {
      api.patch(`/users/resetPassword/${id}`, data);
      toast({
        title: "Senha recuperada com sucesso!",
        description: "Realize o login!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Erro ao recuperar senha!",
        description: "Tente novamente!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Header />
      <Flex
        h={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        bg={"grey.8"}
      >
        <Card mb={"100px"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <Text textStyle={"heading_7_500"}>Recupere a senha</Text>
            </CardHeader>
            <CardBody>
              <FormControl mt={4} isInvalid={errors.password ? true : false}>
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

              <FormControl
                mt={4}
                isInvalid={errors.confirmPassword ? true : false}
              >
                <FormLabel textStyle={"input_label"}>Confirmar senha</FormLabel>

                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digitar senha"
                    focusBorderColor="brand.1"
                    textStyle={"input_placeholder"}
                    {...register("confirmPassword")}
                    onChange={(e) => setConfpass(e.target.value)}
                    value={confpass}
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
                {errors.confirmPassword && (
                  <FormErrorMessage>
                    {errors.confirmPassword.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </CardBody>

            <CardFooter display={"flex"} justifyContent={"flex-end"}>
              <Button type="submit">Enviar</Button>
            </CardFooter>
          </form>
        </Card>
      </Flex>
      <Footer />
    </>
  );
};
