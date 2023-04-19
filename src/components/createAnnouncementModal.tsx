import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
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
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api, fipeApi } from "../services/axios";
import { iAnnouncement, useAd } from "../context/announcements.context";

interface IFipeData {
  id: string;
  name: string;
  brand: string;
  year: string;
  fuel: number;
  value: number;
}
interface IImage {
  img: string;
}

interface IInputImage {
  num: number;
}

interface ICreateAnnouncement {
  brand: string;
  model: string;
  year: number;
  fuel: string;
  odometer: number;
  color: string;
  fipe: string;
  price: number;
  description: string;
  images: IImage[];
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
  const [imgInputs, setImgInputs] = useState<IInputImage[] | null>(null);
  const { createAnnouncement } = useAd();

  const [isModalCreate, setIsModalCreate] = useState(true);

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
    brand: yup.string().required("Este campo é obrigatório"),
    model: yup.string().required("Este campo é obrigatório"),
    year: yup.number().required("Este campo é obrigatório"),
    fuel: yup.string().required("Este campo é obrigatório"),
    odometer: yup.number().required("Este campo é obrigatório"),
    color: yup.string().required("Este campo é obrigatório"),
    fipe: yup.string().required("Este campo é obrigatório"),
    price: yup.number().required("Este campo é obrigatório"),
    description: yup.string().required("Este campo é obrigatório"),
    images: yup.array().of(
      yup.object().shape({
        img: yup.mixed().required("Este campo é obrigatório"),
      })
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iAnnouncement>({ resolver: yupResolver(formSchema) });

  const handleSelectModel = (event: any) => {
    const model = carModelList?.filter((el) => el.name === event.target!.value);

    if (model!.length !== 0) {
      setCarModel(model!);
    } else {
      setCarModel(null);
    }
  };

  const onSubmitFunction = async () => {
    try {
      const { data } = await api.post("/advertise", formSchema);
      setIsModalCreate(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const clickAddImg = () => {
    if (!imgInputs) {
      return setImgInputs([{ num: 4 }]);
    }

    const data = {
      num: imgInputs[imgInputs.length - 1].num + 1,
    };

    return setImgInputs([...imgInputs, data]);
  };

  const openModal = () => {
    setSelectBrand(null);
    setCarModel(null);
    setIsModalCreate(true);
    onOpen();
  };

  return (
    <>
      <Button onClick={openModal} variant={"outlineBrand"}>
        Criar anuncio
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          {isModalCreate ? (
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <Stack spacing={4}>
                <ModalBody pb={6}>
                  <ModalHeader textStyle={"heading_7_500"}>
                    Criar anúncio
                  </ModalHeader>
                  <ModalCloseButton />
                  <Text textStyle="body_2_500" mb={"2rem"} fontWeight={"bold"}>
                    Informações do veículo
                  </Text>
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
                    {errors.brand && (
                      <FormErrorMessage>
                        {errors.brand.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel textStyle={"input_label"}>Modelo</FormLabel>
                    <Select
                      textStyle={"input_placeholder"}
                      placeholder="Selecione o modelo"
                      focusBorderColor="brand.1"
                      {...register("model")}
                      isDisabled={false}
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
                    {errors.model && (
                      <FormErrorMessage>
                        {errors.model.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <Flex justifyContent={"space-between"} wrap={"wrap"}>
                    <FormControl mt={4} w="48%">
                      <FormLabel textStyle={"input_label"}>Ano</FormLabel>
                      <Input
                        textStyle={"input_placeholder"}
                        placeholder="Selecione o ano"
                        focusBorderColor="brand.1"
                        isDisabled={false}
                        {...register("year")}
                        value={carModel ? carModel[0].year : "0000"}
                      />
                      {errors.year && (
                        <FormErrorMessage>
                          {errors.year.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>

                    <FormControl mt={4} w="48%">
                      <FormLabel textStyle={"input_label"}>
                        Combustível
                      </FormLabel>
                      <Input
                        textStyle={"input_placeholder"}
                        placeholder="Selecione o combustível"
                        focusBorderColor="brand.1"
                        isDisabled={false}
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
                      {errors.fuel && (
                        <FormErrorMessage>
                          {errors.fuel.message}
                        </FormErrorMessage>
                      )}
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
                      {errors.odometer && (
                        <FormErrorMessage>
                          {errors.odometer.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>

                    <FormControl mt={4} w="48%">
                      <FormLabel textStyle={"input_label"}>Cor</FormLabel>
                      <Input
                        placeholder="Branco"
                        focusBorderColor="brand.1"
                        {...register("color")}
                        textStyle={"input_placeholder"}
                      />
                      {errors.color && (
                        <FormErrorMessage>
                          {errors.color.message}
                        </FormErrorMessage>
                      )}
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
                        isDisabled={false}
                        {...register("fipe")}
                        value={
                          carModel ? `R$ ${carModel[0].value},00` : "0000000"
                        }
                      />
                      {errors.fipe && (
                        <FormErrorMessage>
                          {errors.fipe.message}
                        </FormErrorMessage>
                      )}
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
                      {errors.price && (
                        <FormErrorMessage>
                          {errors.price.message}
                        </FormErrorMessage>
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
                      {...register("images.0.img")}
                      focusBorderColor="brand.1"
                    />
                    {errors.images && (
                      <FormErrorMessage>
                        {errors.images.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel textStyle={"input_label"}>
                      1° Imagem da galeria
                    </FormLabel>
                    <Input
                      textStyle={"input_placeholder"}
                      placeholder="https://image.com"
                      {...register("images.1.img")}
                      focusBorderColor="brand.1"
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel textStyle={"input_label"}>
                      2° Imagem da galeria
                    </FormLabel>
                    <Input
                      textStyle={"input_placeholder"}
                      placeholder="https://image.com"
                      {...register("images.2.img")}
                      focusBorderColor="brand.1"
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel textStyle={"input_label"}>
                      3° Imagem da galeria
                    </FormLabel>
                    <Input
                      textStyle={"input_placeholder"}
                      placeholder="https://image.com"
                      {...register("images.3.img")}
                      focusBorderColor="brand.1"
                    />
                  </FormControl>

                  {imgInputs &&
                    imgInputs.map((el) => (
                      <FormControl mt={4}>
                        <FormLabel textStyle={"input_label"}>
                          {`${el.num}° Imagem da galeria `}
                        </FormLabel>
                        <Input
                          textStyle={"input_placeholder"}
                          placeholder="https://image.com"
                          {...register(`images.${el.num}.img`)}
                          focusBorderColor="brand.1"
                        />
                      </FormControl>
                    ))}

                  <Button
                    mt={4}
                    variant={"brandOpacity"}
                    size={"medium"}
                    onClick={clickAddImg}
                  >
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
              </Stack>
            </form>
          ) : (
            <ModalBody p={"24px 26px"}>
              <Text textStyle={"heading_7_500"} mb={"2rem"}>
                Sucesso!
              </Text>
              <ModalCloseButton />
              <Text textStyle={"heading_7_500"} mb={"2rem"}>
                Seu anúncio foi criado com sucesso!
              </Text>
              <Text textStyle={"body_1_400"}>
                Agora você poderá ver seus negócios crescendo em grande escala
              </Text>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
