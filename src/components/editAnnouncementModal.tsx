import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Flex,
  FormControl,
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
import { useEffect, useRef, useState } from "react";
import { api } from "../services/axios";
import { iAnnouncement, useAd } from "../context/announcements.context";

export const EditAnnouncementModal = ({ idAnnouncement }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { editAnnouncement, deleteAnnouncement } = useAd();
  const [thisAnnouncement, setThisAnnouncement] =
    useState<iAnnouncement | null>(null);
  const [openEdit, setOpenEdit] = useState(0);
  const [isPublished, setIsPublished] = useState(true);
  const [odometer, setOdometer] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [img0, setImg0] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [isDelete, setIsDelete] = useState(true);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  useEffect(() => {
    const announcement = async () => {
      try {
        const { data } = await api.get(`/advertise/${idAnnouncement}`);
        setThisAnnouncement(data);
        setIsPublished(data.isPublished);
        setColor(data.color);
        setDescription(data.description);
        setPrice(data.price);
        setOdometer(data.odometer);
        setImg0(data.images[0].img);
        setImg1(data.images[1].img);
        setImg2(data.images[2].img);
        setImg3(data.images[3].img);
      } catch (error) {
        console.error(error);
      }
    };
    announcement();
  }, [openEdit]);

  const formSchema = yup.object().shape({
    brand: yup.string(),
    odometer: yup.number(),
    color: yup.string(),
    price: yup.number(),
    description: yup.string(),
    images: yup.array().of(
      yup.object().shape({
        img: yup.mixed(),
      })
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const onSubmit = async (formSchema: any) => {
    formSchema.isPublished = isPublished;

    try {
      editAnnouncement(idAnnouncement, formSchema);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setOpenEdit(openEdit + 1);
    onOpen();
    setIsDelete(true);
  };

  return (
    <>
      <Button onClick={openModal} variant={"outline1"}>
        Editar
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          {isDelete ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader textStyle={"heading_7_500"}>
                Editar anúncio
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text textStyle="body_2_500" mb={"2rem"} fontWeight={"bold"}>
                  Informações do veículo
                </Text>
                <Flex direction={"column"} gap={2}>
                  <FormControl>
                    <FormLabel>Marca</FormLabel>
                    <Input
                      isDisabled
                      ref={initialRef}
                      placeholder="Selecione a marca"
                      focusBorderColor="brand.1"
                      value={thisAnnouncement ? thisAnnouncement.brand : ""}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Modelo</FormLabel>
                    <Input
                      placeholder="Selecione o modelo"
                      focusBorderColor="brand.1"
                      isDisabled
                      value={thisAnnouncement ? thisAnnouncement.model : ""}
                    />
                  </FormControl>

                  <Flex justifyContent={"space-between"} wrap={"wrap"}>
                    <FormControl mt={4} w="48%">
                      <FormLabel>Ano</FormLabel>
                      <Input
                        isDisabled
                        placeholder="Selecione o ano"
                        focusBorderColor="brand.1"
                        value={thisAnnouncement ? thisAnnouncement.year : ""}
                      />
                    </FormControl>

                    <FormControl mt={4} w="48%">
                      <FormLabel>Combustível</FormLabel>
                      <Input
                        isDisabled
                        placeholder="Selecione o combustível"
                        focusBorderColor="brand.1"
                        value={thisAnnouncement ? thisAnnouncement.fuel : ""}
                      />
                    </FormControl>

                    <FormControl mt={4} w="48%">
                      <FormLabel>Quilometragem</FormLabel>
                      <Input
                        placeholder="30000"
                        focusBorderColor="brand.1"
                        {...register("odometer")}
                        onChange={(e) => setOdometer(e.target.value)}
                        value={odometer}
                      />
                    </FormControl>

                    <FormControl mt={4} w="48%">
                      <FormLabel>Cor</FormLabel>
                      <Input
                        placeholder="Branco"
                        focusBorderColor="brand.1"
                        {...register("color")}
                        onChange={(e) => setColor(e.target.value)}
                        value={color}
                      />
                    </FormControl>

                    <FormControl mt={4} w="48%">
                      <FormLabel>Preço tabela FIPE</FormLabel>
                      <Input
                        placeholder="40000"
                        focusBorderColor="brand.1"
                        isDisabled
                        value={thisAnnouncement ? thisAnnouncement.fipe : ""}
                      />
                    </FormControl>

                    <FormControl mt={4} w="48%">
                      <FormLabel>Preço</FormLabel>
                      <Input
                        placeholder="40000"
                        focusBorderColor="brand.1"
                        {...register("price")}
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                      />
                    </FormControl>
                  </Flex>

                  <FormControl mt={4}>
                    <FormLabel>Descrição</FormLabel>
                    <Textarea
                      focusBorderColor="brand.1"
                      resize={"none"}
                      {...register("description")}
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Publicado</FormLabel>
                    <Flex justifyContent={"space-between"}>
                      <Button
                        w={"48%"}
                        variant={isPublished ? "default" : "outline.2"}
                        onClick={() => setIsPublished(true)}
                      >
                        Sim
                      </Button>
                      <Button
                        w={"48%"}
                        variant={isPublished ? "outline.2" : "default"}
                        onClick={() => setIsPublished(false)}
                      >
                        Não
                      </Button>
                    </Flex>
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Imagem da capa</FormLabel>
                    <Input
                      placeholder="https://image.com"
                      focusBorderColor="brand.1"
                      {...register("images.0.img")}
                      onChange={(e) => setImg0(e.target.value)}
                      value={img0}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>1° Imagem da capa</FormLabel>
                    <Input
                      placeholder="https://image.com"
                      focusBorderColor="brand.1"
                      {...register("images.1.img")}
                      onChange={(e) => setImg1(e.target.value)}
                      value={img1}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>2° Imagem da capa</FormLabel>
                    <Input
                      placeholder="https://image.com"
                      focusBorderColor="brand.1"
                      {...register("images.2.img")}
                      onChange={(e) => setImg2(e.target.value)}
                      value={img2}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>3° Imagem da capa</FormLabel>
                    <Input
                      placeholder="https://image.com"
                      focusBorderColor="brand.1"
                      {...register("images.3.img")}
                      onChange={(e) => setImg3(e.target.value)}
                      value={img3}
                    />
                  </FormControl>
                </Flex>
                <Button
                  mt={4}
                  variant={"brandOpacity"}
                  size={"medium"}
                  fontSize={"14px"}
                  fontWeight={"bold"}
                >
                  Adicionar campo para imagem da galeria
                </Button>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={() => setIsDelete(false)}
                  mr={3}
                  variant={"negative"}
                >
                  Excluir anúncio
                </Button>
                <Button variant={"default"} type="submit">
                  Salvar alterações
                </Button>
              </ModalFooter>
            </form>
          ) : (
            <form>
              <ModalHeader textStyle={"heading_7_500"}>
                Deletar anúncio
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text textStyle="body_2_500" mb={"2rem"} fontWeight={"bold"}>
                  Tem certeza que deseja remover este anúncio?
                </Text>
                <Text>
                  Essa ação não pode ser desfeita. Isso excluirá permanentemente
                  sua conta e removerá seus dados de nossos servidores.
                </Text>
              </ModalBody>
              <ModalFooter>
                <Flex justifyContent={"flex-end"} gap={3}>
                  <Button variant={"negative"} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    variant={"warning"}
                    onClick={() => deleteAnnouncement(idAnnouncement)}
                  >
                    Sim, excluir anúncio
                  </Button>
                </Flex>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
