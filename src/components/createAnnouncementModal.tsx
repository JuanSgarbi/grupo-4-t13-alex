import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
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
import { useEffect, useRef, useState } from "react";
import { fipeApi } from "../services/axios";
import { Form } from "react-router-dom";

interface IFipeData {
  id: string;
  name: string;
  brand: string;
  year: string;
  fuel: number;
  value: number;
}

export const CreateAnnouncementModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fipeTableBrands = [
    "citroën",
    "fiat",
    "chevrolet",
    "honda",
    "hyundai",
    "nissan",
    "peugeot",
    "renault",
    "toyota",
    "volkswagen",
  ];

  const [selectBrand, setSelectBrand] = useState<string | null>(null);
  const [carModelList, setCarModelList] = useState<IFipeData[] | null>(null);
  const [carModel, setCarModel] = useState<IFipeData[] | null>(null);
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fipe = async () => {
      if (selectBrand !== "") {
        try {
          const { data } = await fipeApi.get(`/cars?brand=${selectBrand}`);
          setCarModelList(data);

          return data;
        } catch (error) {
          console.error(error);
        }
      }
    };
    fipe();
  }, [selectBrand]);

  const formSchema = yup.object().shape({
    brand: yup.string().required(),
    model: yup.string().required(),
    year: yup.number().required(),
    fuel: yup.string().required(),
    odometer: yup.number().required(),
    color: yup.string().required(),
    fipe: yup.string().required(),
    price: yup.number().required(),
    description: yup.string().required(),
  });

  const handleSelectModel = (event: any) => {
    const model = carModelList?.filter((el) => el.name === event.target.value);

    if (model!.length !== 0) {
      setCarModel(model!);
    } else {
      setCarModel(null);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const onSubmitFunction = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Button onClick={onOpen} variant={"outlineBrand"}>
        Criar anuncio
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
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
                    textStyle={"input_placeholder"}
                    placeholder="Selecione a marca"
                    focusBorderColor="brand.1"
                    {...register("brand")}
                    onChange={(e) => {
                      setSelectBrand(e.target.value);
                      if (e.target.value == "") {
                        setCarModel(null);
                        setCarModelList(null);
                      }
                    }}
                  >
                    {fipeTableBrands.map((element) => (
                      <option value={element}>
                        {element[0].toUpperCase() + element.substring(1)}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel textStyle={"input_label"}>Modelo</FormLabel>
                  <Select
                    textStyle={"input_placeholder"}
                    placeholder="Selecione o modelo"
                    focusBorderColor="brand.1"
                    {...register("model")}
                    isDisabled={selectBrand ? false : true}
                    onChange={handleSelectModel}
                  >
                    {carModelList ? (
                      carModelList.map((element) => (
                        <option value={element.name}>
                          {element.name[0].toUpperCase() +
                            element.name.substring(1)}
                        </option>
                      ))
                    ) : (
                      <option>carregando...</option>
                    )}
                  </Select>
                </FormControl>

                <Flex justifyContent={"space-between"} wrap={"wrap"}>
                  <FormControl mt={4} w="48%">
                    <FormLabel textStyle={"input_label"}>Ano</FormLabel>
                    <Input
                      textStyle={"input_placeholder"}
                      placeholder="Selecione o ano"
                      focusBorderColor="brand.1"
                      isDisabled
                      {...register("year")}
                      value={carModel ? carModel[0].year : "0000"}
                    />
                  </FormControl>

                  <FormControl mt={4} w="48%">
                    <FormLabel textStyle={"input_label"}>Combustível</FormLabel>
                    <Input
                      textStyle={"input_placeholder"}
                      placeholder="Selecione o combustível"
                      focusBorderColor="brand.1"
                      isDisabled
                      {...register("fuel")}
                      value={
                        carModel
                          ? carModel[0].fuel === 1
                            ? "Flex"
                            : carModel[0].fuel === 2
                            ? "Hibrido"
                            : "Elétrico"
                          : "0000"
                      }
                    />
                  </FormControl>

                  <FormControl mt={4} w="48%">
                    <FormLabel textStyle={"input_label"}>
                      Quilometragem
                    </FormLabel>
                    <Input
                      placeholder="30000"
                      focusBorderColor="brand.1"
                      {...register("odometer")}
                      textStyle={"input_placeholder"}
                    />
                  </FormControl>

                  <FormControl mt={4} w="48%">
                    <FormLabel textStyle={"input_label"}>Cor</FormLabel>
                    <Input
                      placeholder="Branco"
                      focusBorderColor="brand.1"
                      {...register("color")}
                      textStyle={"input_placeholder"}
                    />
                  </FormControl>

                  <FormControl mt={4} w="48%">
                    <FormLabel
                      textStyle={"input_label"}
                      overflow={"hidden"}
                      whiteSpace={"nowrap"}
                      textOverflow={"ellipsis"}
                    >
                      Preço tabela FIPE
                    </FormLabel>
                    <Input
                      placeholder="40000"
                      focusBorderColor="brand.1"
                      textStyle={"input_placeholder"}
                      isDisabled
                      {...register("fipe")}
                      value={
                        carModel ? `R$ ${carModel[0].value},00` : "0000000"
                      }
                    />
                  </FormControl>

                  <FormControl mt={4} w="48%">
                    <FormLabel textStyle={"input_label"}>Preço</FormLabel>

                    <Input
                      placeholder="40000"
                      focusBorderColor="brand.1"
                      textStyle={"input_placeholder"}
                      {...register("price")}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    {price !== "" && (
                      <FormHelperText>Insira apenas números</FormHelperText>
                    )}
                  </FormControl>
                </Flex>

                <FormControl mt={4}>
                  <FormLabel textStyle={"input_label"}>Descrição</FormLabel>
                  <Textarea
                    focusBorderColor="brand.1"
                    resize={"none"}
                    {...register("description")}
                    textStyle={"input_placeholder"}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel textStyle={"input_label"}>
                    Imagem da capa
                  </FormLabel>
                  <Input
                    textStyle={"input_placeholder"}
                    placeholder="https://image.com"
                    focusBorderColor="brand.1"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel textStyle={"input_label"}>
                    1° Imagem da capa
                  </FormLabel>
                  <Input
                    textStyle={"input_placeholder"}
                    placeholder="https://image.com"
                    focusBorderColor="brand.1"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel textStyle={"input_label"}>
                    2° Imagem da capa
                  </FormLabel>
                  <Input
                    textStyle={"input_placeholder"}
                    placeholder="https://image.com"
                    focusBorderColor="brand.1"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel textStyle={"input_label"}>
                    3° Imagem da capa
                  </FormLabel>
                  <Input
                    textStyle={"input_placeholder"}
                    placeholder="https://image.com"
                    focusBorderColor="brand.1"
                  />
                </FormControl>
              </Flex>
              <Button mt={4} variant={"brandOpacity"} size={"medium"}>
                Adicionar campo para imagem da galeria
              </Button>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} mr={3} variant={"negative"}>
                Cancelar
              </Button>
              <Button variant={"default"} type="submit">
                Criar anúncio
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
