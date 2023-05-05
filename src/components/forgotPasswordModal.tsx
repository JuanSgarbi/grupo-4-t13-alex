import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { api } from "../services/axios";

interface IForgotPass {
  email: string;
}

export const ForgotPasswordModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const toast = useToast();

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Insira um email válido")
      .required("Este campo é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPass>({ resolver: yupResolver(formSchema) });

  const onSubmitFunction = async (schema: IForgotPass) => {
    try {
      const { data } = await api.post("/users/resetPassword", schema);
      toast({
        title: "Email enviado!",
        description: "Verifique na caixa de entrada e no spam!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao enviar email!",
        description:
          "Verifique se o email inserido é o mesmo que foi cadastrado!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  return (
    <>
      <Button variant={"link2"} size={"small"} onClick={onOpen}>
        Esqueci minha senha
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <ModalHeader>Recupere sua senha</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4} isInvalid={errors.email ? true : false}>
                <FormLabel textStyle={"input_label"}>Email</FormLabel>
                <Input
                  placeholder="Insira seu email"
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
            </ModalBody>

            <ModalFooter>
              <Button type="submit">Enviar</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
