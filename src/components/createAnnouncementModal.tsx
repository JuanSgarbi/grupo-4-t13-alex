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
  Select,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

export const CreateAnnouncementModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <>
      <Button onClick={onOpen} variant={"outlineBrand"}>
        Criar anuncio
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textStyle={"heading_7_500"}>Criar anúncio</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text textStyle="body_2_500" mb={"2rem"} fontWeight={"bold"}>
              Informações do veículo
            </Text>
            <Flex direction={"column"} gap={2}>
              <FormControl>
                <FormLabel>Marca</FormLabel>
                <Select
                  ref={initialRef}
                  placeholder="Selecione a marca"
                  focusBorderColor="brand.1"
                ></Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Modelo</FormLabel>
                <Select
                  placeholder="Selecione o modelo"
                  focusBorderColor="brand.1"
                ></Select>
              </FormControl>

              <Flex justifyContent={"space-between"} wrap={"wrap"}>
                <FormControl mt={4} w="48%">
                  <FormLabel>Ano</FormLabel>
                  <Select
                    placeholder="Selecione o ano"
                    focusBorderColor="brand.1"
                  ></Select>
                </FormControl>

                <FormControl mt={4} w="48%">
                  <FormLabel>Combustível</FormLabel>
                  <Select
                    placeholder="Selecione o combustível"
                    focusBorderColor="brand.1"
                  ></Select>
                </FormControl>

                <FormControl mt={4} w="48%">
                  <FormLabel>Quilometragem</FormLabel>
                  <Input placeholder="30000" focusBorderColor="brand.1" />
                </FormControl>

                <FormControl mt={4} w="48%">
                  <FormLabel>Cor</FormLabel>
                  <Input placeholder="Branco" focusBorderColor="brand.1" />
                </FormControl>

                <FormControl mt={4} w="48%">
                  <FormLabel>Preço tabela FIPE</FormLabel>
                  <Input placeholder="40000" focusBorderColor="brand.1" />
                </FormControl>

                <FormControl mt={4} w="48%">
                  <FormLabel>Preço</FormLabel>
                  <Input placeholder="40000" focusBorderColor="brand.1" />
                </FormControl>
              </Flex>

              <FormControl mt={4}>
                <FormLabel>Descrição</FormLabel>
                <Textarea focusBorderColor="brand.1" resize={"none"} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Imagem da capa</FormLabel>
                <Input
                  placeholder="https://image.com"
                  focusBorderColor="brand.1"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>1° Imagem da capa</FormLabel>
                <Input
                  placeholder="https://image.com"
                  focusBorderColor="brand.1"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>2° Imagem da capa</FormLabel>
                <Input
                  placeholder="https://image.com"
                  focusBorderColor="brand.1"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>3° Imagem da capa</FormLabel>
                <Input
                  placeholder="https://image.com"
                  focusBorderColor="brand.1"
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
            <Button onClick={onClose} mr={3} variant={"negative"}>
              Cancelar
            </Button>
            <Button variant={"brandDisable"}>Criar anúncio</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
