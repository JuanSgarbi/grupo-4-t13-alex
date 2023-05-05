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
  Textarea,
} from "@chakra-ui/react";

import InputMask from "react-input-mask";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { cepApi } from "../../services/axios";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAd } from "../../context/announcements.context";
import { useUser } from "../../context/user.context";

interface ICreateAddress {
  zipCode: string;
  street: string;
  city: string;
  state: string;
  number: string;
  complement?: string;
}

export interface ICreateUser {
  fullName: string;
  cpf: string;
  cellphone: string;
  birthdate: string;
  password: string;
  confirmPassword?: string;
  email: string;
  bio: string;
  address: ICreateAddress;
  isAdvertise?: boolean;
}

export interface IAddressApi {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export const RegisterUser = () => {
  const [addressData, setAddressData] = useState<IAddressApi | null>(null);
  const [showPassword, setShowpassword] = useState(false);
  const [isAdvertise, setIsAdvertise] = useState(false);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [confpass, setConfpass] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const toast = useToast();

  const { registerUser } = useUser();

  const addressSchema = yup.object().shape({
    street: yup.string().required("Este campo é obrigatório"),
    city: yup.string().required("Este campo é obrigatório"),
    state: yup.string().required("Este campo é obrigatório"),
    number: yup.string().required("Este campo é obrigatório"),
    complement: yup.string(),
  });

  const formSchema = yup.object().shape({
    fullName: yup.string().required("Este campo é obrigatório"),
    cpf: yup.string().required("Este campo é obrigatório"),
    cellphone: yup.string().required("Este campo é obrigatório"),
    birthdate: yup.string().required("Este campo é obrigatório"),
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
    email: yup
      .string()
      .email("Insira um email válido")
      .required("Este campo é obrigatório"),
    bio: yup.string().required("Este campo é obrigatório"),

    address: addressSchema,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUser>({ resolver: yupResolver(formSchema) });

  const onSubmit = (data: ICreateUser) => {
    delete data.confirmPassword;
    if (addressData) {
      data.address.zipCode = addressData.cep.replace("-", "");
    }

    registerUser(data);
    console.error(errors);
  };

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

  return (
    <Flex h={"max-content"} bg={"grey.8"} justifyContent={"center"}>
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
        <Text mb={"1rem"} textStyle={"heading_5_500"}>
          Cadastro
        </Text>
        <Text textStyle={"body_2_500"}>Informações pessoais</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <FormErrorMessage>{errors.fullName.message}</FormErrorMessage>
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

          <FormControl mt={4} isInvalid={errors.cpf ? true : false}>
            <FormLabel textStyle={"input_label"}>CPF</FormLabel>

            <Input
              as={InputMask}
              mask="999.999.999-99"
              maskChar={null}
              placeholder="000.000.000-00"
              focusBorderColor="brand.1"
              textStyle={"input_placeholder"}
              {...register("cpf")}
              onChange={(e) => setCpf(e.target.value)}
              value={cpf}
            />
            {errors.cpf && (
              <FormErrorMessage>{errors.cpf.message}</FormErrorMessage>
            )}
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
              <FormErrorMessage>{errors.cellphone.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mt={4} isInvalid={errors.birthdate ? true : false}>
            <FormLabel textStyle={"input_label"}>Data de nascimento</FormLabel>
            <Input
              as={InputMask}
              mask="99/99/99"
              maskChar={null}
              placeholder="00/00/00"
              focusBorderColor="brand.1"
              textStyle={"input_placeholder"}
              {...register("birthdate")}
              onChange={(e) => setBirthdate(e.target.value)}
              value={birthdate}
            />
            {errors.birthdate && (
              <FormErrorMessage>{errors.birthdate.message}</FormErrorMessage>
            )}
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

          <Text mt={4} textStyle={"body_2_500"}>
            Informações de endereço
          </Text>

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
            />
          </FormControl>

          <Flex gap={3}>
            <FormControl mt={4}>
              <FormLabel textStyle={"input_label"}>Estado</FormLabel>
              <Input
                placeholder="Digitar estado"
                focusBorderColor="brand.1"
                textStyle={"input_placeholder"}
                {...register("address.state")}
                value={addressData ? addressData.uf : ""}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel textStyle={"input_label"}>Cidade</FormLabel>
              <Input
                placeholder="Digitar cidade"
                focusBorderColor="brand.1"
                textStyle={"input_placeholder"}
                {...register("address.city")}
                value={addressData ? addressData.localidade : ""}
              />
            </FormControl>
          </Flex>

          <FormControl mt={4}>
            <FormLabel textStyle={"input_label"}>Rua</FormLabel>
            <Input
              placeholder="Digitar rua"
              focusBorderColor="brand.1"
              textStyle={"input_placeholder"}
              {...register("address.street")}
              value={addressData ? addressData.logradouro : ""}
            />
          </FormControl>

          <Flex gap={3}>
            <FormControl
              mt={4}
              isInvalid={errors.address?.number ? true : false}
            >
              <FormLabel textStyle={"input_label"}>Número</FormLabel>
              <Input
                placeholder="Digitar número"
                focusBorderColor="brand.1"
                textStyle={"input_placeholder"}
                {...register("address.number")}
                onChange={(e) => setNumero(e.target.value)}
                value={numero}
              />
              {errors.address?.number && (
                <FormErrorMessage>
                  {errors.address?.number.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel textStyle={"input_label"}>Complemento</FormLabel>
              <Input
                placeholder="Ex: apart 137"
                focusBorderColor="brand.1"
                textStyle={"input_placeholder"}
                {...register("address.complement")}
                onChange={(e) => setComplemento(e.target.value)}
                value={complemento}
              />
            </FormControl>
          </Flex>

          <Text mt={4} textStyle={"body_2_500"}>
            Tipo de conta
          </Text>

          <Flex mt={4} gap={3} direction={{ base: "column", md: "row" }}>
            <Button
              variant={isAdvertise ? "outline2" : "default"}
              w={"100%"}
              onClick={() => setIsAdvertise(false)}
            >
              Comprador
            </Button>
            <Button
              variant={isAdvertise ? "default" : "outline2"}
              w={"100%"}
              onClick={() => setIsAdvertise(true)}
            >
              Anunciante
            </Button>
          </Flex>

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

          <FormControl mt={4} isInvalid={errors.confirmPassword ? true : false}>
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

          <Button type="submit" w={"100%"} mt={4} variant={"default"}>
            Finalizar cadastro
          </Button>
        </form>
      </Flex>
      <Footer />
    </Flex>
  );
};
