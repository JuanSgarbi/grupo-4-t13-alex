import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { ButtonFilter } from "./buttonFilter";

export const NavFilters = () => {
  return (
    <Flex
      flexDirection={"column"}
      maxW={"450px"}
      minW={"300px"}
      w={"90%"}
      p={"1rem"}
    >
      <Flex flexDirection={"column"}>
        <Text
          color={"grey.0"}
          textStyle={"heading_4_600"}
          lineHeight={"35px"}
          marginY={"1rem"}
        >
          Marca
        </Text>
        <ButtonFilter buttonName="General Motors" />
        <ButtonFilter buttonName="Fiat" />
        <ButtonFilter buttonName="Ford" />
        <ButtonFilter buttonName="Honda" />
        <ButtonFilter buttonName="Porsche" />
        <ButtonFilter buttonName="Volkswagen" />
      </Flex>
      <Flex flexDirection={"column"}>
        <Text color={"grey.0"} textStyle={"heading_4_600"} marginY={"1rem"}>
          Modelo
        </Text>
        <ButtonFilter buttonName="Civic" />
        <ButtonFilter buttonName="Corolla" />
        <ButtonFilter buttonName="Cruze" />
        <ButtonFilter buttonName="Fit" />
        <ButtonFilter buttonName="Gol" />
        <ButtonFilter buttonName="Ka" />
        <ButtonFilter buttonName="Onix" />
        <ButtonFilter buttonName="Porsche 718" />
      </Flex>
      <Flex flexDirection={"column"}>
        <Text color={"grey.0"} textStyle={"heading_4_600"} marginY={"1rem"}>
          Cor
        </Text>
        <ButtonFilter buttonName="Azul" />
        <ButtonFilter buttonName="Branca" />
        <ButtonFilter buttonName="Prata" />
        <ButtonFilter buttonName="Preta" />
        <ButtonFilter buttonName="Verde" />
      </Flex>
      <Flex flexDirection={"column"}>
        <Text color={"grey.0"} textStyle={"heading_4_600"} marginY={"1rem"}>
          Ano
        </Text>
        <ButtonFilter buttonName="2022" />
        <ButtonFilter buttonName="2021" />
        <ButtonFilter buttonName="2018" />
        <ButtonFilter buttonName="2015" />
        <ButtonFilter buttonName="2013" />
        <ButtonFilter buttonName="2012" />
        <ButtonFilter buttonName="2010" />
      </Flex>
      <Flex flexDirection={"column"}>
        <Text color={"grey.0"} textStyle={"heading_4_600"} marginY={"1rem"}>
          Combustível
        </Text>
        <ButtonFilter buttonName="Diesel" />
        <ButtonFilter buttonName="Etanol" />
        <ButtonFilter buttonName="Gasolina" />
        <ButtonFilter buttonName="Flex" />
      </Flex>
      <Text color={"grey.0"} textStyle={"heading_4_600"} marginY={"1rem"}>
        Km
      </Text>
      <Flex flexDirection={"row"} w={"100%"} p={"0.5rem"} gap={"1rem"}>
        <Input
          placeholder={"Minima"}
          bg="grey.5"
          textStyle={"heading_7_600"}
          border={"none"}
          borderRadius={"none"}
          focusBorderColor="transparent"
        ></Input>
        <Input
          placeholder={"Máxima"}
          bg="grey.5"
          textStyle={"heading_7_600"}
          border={"none"}
          borderRadius={"none"}
          focusBorderColor="transparent"
        ></Input>
      </Flex>
      <Text color={"grey.0"} textStyle={"heading_4_600"} marginY={"1rem"}>
        Preço
      </Text>
      <Flex flexDirection={"row"} w={"100%"} p={"0.5rem"} gap={"1rem"}>
        <Input
          placeholder={"Minima"}
          bg="grey.5"
          textStyle={"heading_7_600"}
          border={"none"}
          borderRadius={"none"}
          focusBorderColor="transparent"
        ></Input>
        <Input
          placeholder={"Máxima"}
          bg="grey.5"
          textStyle={"heading_7_600"}
          border={"none"}
          borderRadius={"none"}
          focusBorderColor="transparent"
        ></Input>
      </Flex>
      <Button margin={"0 auto"} marginY={"1rem"} w={"90%"}>
        Ver anúncios
      </Button>
    </Flex>
  );
};
