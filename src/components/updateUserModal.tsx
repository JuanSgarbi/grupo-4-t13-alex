import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";
import { useUser } from "../context/user.context";

export interface IUpdateUser {
  fullName?: string;
  cellphone?: string;
  email?: string;
  bio?: string;
}

export const UpdateUserModal = () => {
  const { user, updateUser, deleteUser } = useUser();
  const [name, setName] = useState(user.fullName);
  const [cpf, setCpf] = useState(user.cpf);
  const [cellphone, setCellphone] = useState(user.cellphone);
  const [birthdate, setBirthdate] = useState(user.birthdate);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [isDelete, setIsDelete] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formSchema = yup.object().shape({
    fullName: yup.string().required("Este campo é obrigatório"),
    cellphone: yup.string().required("Este campo é obrigatório"),
    email: yup
      .string()
      .email("Insira um email válido")
      .required("Este campo é obrigatório"),
    bio: yup.string().required("Este campo é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateUser>({ resolver: yupResolver(formSchema) });

  const onSubmit = (data: IUpdateUser) => {
    updateUser(data, user.id);
    onClose();
  };

  const openModal = () => {
    setIsDelete(true);
    onOpen();
  };

  return (
    <>
      <Button variant={"link2"} size={"small"} onClick={openModal}>
        Editar perfil
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          {isDelete ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader textStyle={"heading_7_500"}>
                Editar perfil
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text textStyle={"body_2_500"}>Informações pessoais</Text>
                <FormControl mt={4} isInvalid={errors.fullName ? true : false}>
                  <FormLabel textStyle={"input_label"}>Nome</FormLabel>
                  <Input
                    placeholder="Ex: Juan Sgarbi"
                    focusBorderColor="brand.1"
                    textStyle={"input_placeholder"}
                    {...register("fullName")}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  {errors.fullName && (
                    <FormErrorMessage>
                      {errors.fullName.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl mt={4} isInvalid={errors.email ? true : false}>
                  <FormLabel textStyle={"input_label"}>Email</FormLabel>
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

                <FormControl mt={4}>
                  <FormLabel textStyle={"input_label"}>CPF</FormLabel>

                  <Input
                    as={InputMask}
                    mask="999.999.999-99"
                    maskChar={null}
                    placeholder="000.000.000-00"
                    focusBorderColor="brand.1"
                    textStyle={"input_placeholder"}
                    onChange={(e) => setCpf(e.target.value)}
                    value={cpf}
                    isDisabled
                  />
                </FormControl>

                <FormControl mt={4} isInvalid={errors.cellphone ? true : false}>
                  <FormLabel textStyle={"input_label"}>Celular</FormLabel>
                  <Input
                    placeholder="(DDD) 90000-0000"
                    as={InputMask}
                    mask="(099) 99999-9999"
                    maskChar={null}
                    focusBorderColor="brand.1"
                    textStyle={"input_placeholder"}
                    {...register("cellphone")}
                    onChange={(e) => setCellphone(e.target.value)}
                    value={cellphone}
                  />
                  {errors.cellphone && (
                    <FormErrorMessage>
                      {errors.cellphone.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel textStyle={"input_label"}>
                    Data de nascimento
                  </FormLabel>
                  <Input
                    as={InputMask}
                    mask="99/99/99"
                    maskChar={null}
                    placeholder="00/00/00"
                    focusBorderColor="brand.1"
                    textStyle={"input_placeholder"}
                    onChange={(e) => setBirthdate(e.target.value)}
                    value={birthdate}
                    isDisabled
                  />
                </FormControl>

                <FormControl mt={4} isInvalid={errors.bio ? true : false}>
                  <FormLabel textStyle={"input_label"}>Descrição</FormLabel>
                  <Textarea
                    focusBorderColor="brand.1"
                    resize={"none"}
                    textStyle={"input_placeholder"}
                    placeholder="Digitar descrição"
                    {...register("bio")}
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                  />
                  {errors.bio && (
                    <FormErrorMessage>{errors.bio.message}</FormErrorMessage>
                  )}
                </FormControl>
              </ModalBody>

              <ModalFooter display={"flex"} justifyContent={"space-between"}>
                <Button variant={"negative"} onClick={onClose}>
                  Cancelar
                </Button>
                <Button variant={"warning"} onClick={() => setIsDelete(false)}>
                  Excluir perfil
                </Button>
                <Button type="submit" variant={"default"}>
                  Salvar alterações
                </Button>
              </ModalFooter>
            </form>
          ) : (
            <>
              <Flex direction={"column"} gap={"2rem"} p={6}>
                <Text textStyle={"heading_7_500"}>Excluir conta</Text>
                <ModalCloseButton />

                <Text textStyle={"heading_7_500"}>
                  Tem certeza que deseja excluir sua conta?
                </Text>

                <Text textStyle={"body_1_400"}>
                  Essa ação não pode ser desfeita. Isso excluirá permanentemente
                  sua conta e removerá seus dados de nossos servidores.
                </Text>

                <Flex justifyContent={"flex-end"} gap={3}>
                  <Button variant={"negative"} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    variant={"warning"}
                    onClick={() => deleteUser(user.id)}
                  >
                    Sim, excluir conta
                  </Button>
                </Flex>
              </Flex>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
