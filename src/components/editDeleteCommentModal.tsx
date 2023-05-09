import { EditIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Textarea,
  IconButton,
  Flex,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api } from "../services/axios";

export const EditDeleteComment = ({ id, setResetAnnounce, resetAnnounce }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [valueText, setValueText] = useState("");
  const [isDelete, setIsDelete] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const getComment = async () => {
      try {
        const { data } = await api.get(`/comments/${id}`);
        setValueText(data.description);
      } catch (error) {
        console.error(error);
      }
    };
    getComment();
  }, []);

  const formSchema = yup.object().shape({
    description: yup.string().required("Este campo é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const onSubmit = async (formSchema: any) => {
    try {
      await api.patch(`/comments/${id}`, formSchema);
      setResetAnnounce(resetAnnounce + 1);
      onClose();
      toast({
        title: "Comentário editado!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao editar comentário",
        description: "Tente novamente mais tarde",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const openModal = () => {
    onOpen();
    setIsDelete(true);
  };

  const deleteComment = async () => {
    try {
      await api.delete(`/comments/${id}`);
      setResetAnnounce(resetAnnounce + 1);
      toast({
        title: "Comentário deletado!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao deletar comentário",
        description: "Tente novamente mais tarde",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <IconButton
        size="sm"
        icon={<EditIcon />}
        aria-label="Editar comentário"
        onClick={() => openModal()}
        position={"absolute"}
        right={"15px"}
        top={"0"}
        variant={"unset"}
      />

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          {isDelete ? (
            <>
              <ModalHeader>Editar comentário</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Textarea
                  focusBorderColor="brand.1"
                  resize={"none"}
                  {...register("description")}
                  onChange={(e) => setValueText(e.target.value)}
                  value={valueText}
                />
              </ModalBody>

              <Flex p={6} direction={{ base: "column", md: "row" }} gap={3}>
                <Button onClick={onClose} variant={"negative"}>
                  Cancelar
                </Button>
                <Button variant={"warning"} onClick={() => setIsDelete(false)}>
                  Excluir comentário
                </Button>
                <Button variant={"default"} onClick={handleSubmit(onSubmit)}>
                  Salvar alterção
                </Button>
              </Flex>
            </>
          ) : (
            <>
              <ModalHeader>Excluir comentário</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  Essa ação não pode ser desfeita. Isso excluirá permanentemente
                  seu comentário e removerá seus dados de nossos servidores.
                </Text>
              </ModalBody>
              <Flex p={6} direction={{ base: "column", md: "row" }} gap={3}>
                <Button onClick={onClose} variant={"negative"}>
                  Cancelar
                </Button>
                <Button variant={"warning"} onClick={() => deleteComment()}>
                  Excluir comentário
                </Button>
              </Flex>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
