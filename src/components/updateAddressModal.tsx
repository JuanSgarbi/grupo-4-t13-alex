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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { useUser } from "../context/user.context";
import { IAddressApi } from "../pages/registerUser";
import { cepApi } from "../services/axios";

interface IUpdateAddress {
  zipCode: string;
  street: string;
  city: string;
  state: string;
  number: string;
  complement?: string;
}

export const UpdateAddressModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, updateAddress } = useUser();
  const [cep, setCep] = useState(user.address.zipCode);
  const [numero, setNumero] = useState(user.address.number);
  const [complemento, setComplemento] = useState(user.address.complement);
  const [addressData, setAddressData] = useState<IAddressApi | null>(null);

  const toast = useToast();

  const myAddress = async (cep: string) => {
    const { data } = await cepApi.get(`${cep}/json/`);
    if (data.erro) {
      toast({
        title: "Cep não localizado",
        description: "Verifique se o cep está correto",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setAddressData(data);
    }
  };

  const formSchema = yup.object().shape({
    street: yup.string(),
    city: yup.string(),
    state: yup.string(),
    number: yup.string().required("Este campo é obrigatório"),
    complement: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateAddress>({ resolver: yupResolver(formSchema) });

  const onSubmit = (data: IUpdateAddress) => {
    if (addressData) {
      data.zipCode = addressData.cep.replace("-", "");
      data.city = addressData.localidade;
      data.street = addressData.logradouro;
      data.state = addressData.uf;
    }

    updateAddress(data, user.address.id);

    onClose();
  };

  return (
    <>
      <Button variant={"link2"} size={"small"} onClick={onOpen}>
        Editar endereço
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader textStyle={"heading_7_500"}>
              Editar endereço
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Text textStyle={"body_2_500"}>Informações de endereço</Text>
              <FormControl mt={4} isInvalid={cep === ""}>
                <FormLabel textStyle={"input_label"}>CEP</FormLabel>
                <Input
                  placeholder="00000.000"
                  focusBorderColor="brand.1"
                  textStyle={"input_placeholder"}
                  onChange={(e) => {
                    setCep(e.target.value);
                    if (e.target.value.length == 8) {
                      myAddress(e.target.value);
                    } else {
                      setAddressData(null);
                    }
                  }}
                  value={cep}
                />
              </FormControl>

              <Flex gap={3}>
                <FormControl mt={4}>
                  <FormLabel textStyle={"input_label"}>Estado</FormLabel>
                  <Input
                    placeholder="Digitar estado"
                    focusBorderColor="brand.1"
                    textStyle={"input_placeholder"}
                    {...register("state")}
                    value={addressData ? addressData.uf : user.address.state}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel textStyle={"input_label"}>Cidade</FormLabel>
                  <Input
                    placeholder="Digitar cidade"
                    focusBorderColor="brand.1"
                    textStyle={"input_placeholder"}
                    {...register("city")}
                    value={
                      addressData ? addressData.localidade : user.address.city
                    }
                  />
                </FormControl>
              </Flex>

              <FormControl mt={4}>
                <FormLabel textStyle={"input_label"}>Rua</FormLabel>
                <Input
                  placeholder="Digitar rua"
                  focusBorderColor="brand.1"
                  textStyle={"input_placeholder"}
                  {...register("street")}
                  value={
                    addressData ? addressData.logradouro : user.address.street
                  }
                />
              </FormControl>

              <Flex gap={3}>
                <FormControl mt={4} isInvalid={errors.number ? true : false}>
                  <FormLabel textStyle={"input_label"}>Número</FormLabel>
                  <Input
                    placeholder="Digitar número"
                    focusBorderColor="brand.1"
                    textStyle={"input_placeholder"}
                    {...register("number")}
                    onChange={(e) => setNumero(e.target.value)}
                    value={numero}
                  />
                  {errors.number && (
                    <FormErrorMessage>{errors.number.message}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel textStyle={"input_label"}>Complemento</FormLabel>
                  <Input
                    placeholder="Ex: apart 137"
                    focusBorderColor="brand.1"
                    textStyle={"input_placeholder"}
                    {...register("complement")}
                    onChange={(e) => setComplemento(e.target.value)}
                    value={complemento}
                  />
                </FormControl>
              </Flex>
            </ModalBody>

            <ModalFooter display={"flex"} justifyContent={"flex-end"} gap={3}>
              <Button variant={"negative"} onClick={onClose}>
                Cancelar
              </Button>

              <Button type="submit" variant={"default"}>
                Salvar alterações
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
