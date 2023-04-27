import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { ButtonFilter } from "./buttonFilter";

export const NavFilters = ({ filtering, brands, models, colors, years, fuels }) => {
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
        {brands.map((brand: string) => <ButtonFilter key={brand} buttonName={brand} category={"brand"} filtering={filtering} />)}
      </Flex>
      <Flex flexDirection={"column"}>
        <Text color={"grey.0"} textStyle={"heading_4_600"} marginY={"1rem"}>
          Modelo
        </Text>
        {models.map((model: string) => <ButtonFilter key={model} buttonName={model} category={"model"} filtering={filtering} />)}
      </Flex>
      <Flex flexDirection={"column"}>
        <Text color={"grey.0"} textStyle={"heading_4_600"} marginY={"1rem"}>
          Cor
        </Text>
        {colors.map((color: string) => <ButtonFilter key={color} buttonName={color} category={"color"} filtering={filtering} />)}
      </Flex>
      <Flex flexDirection={"column"}>
        <Text color={"grey.0"} textStyle={"heading_4_600"} marginY={"1rem"}>
          Ano
        </Text>
        {years.map((year: string) => <ButtonFilter key={year} buttonName={year} category={"year"} filtering={filtering} />)}
      </Flex>
      <Flex flexDirection={"column"}>
        <Text color={"grey.0"} textStyle={"heading_4_600"} marginY={"1rem"}>
          Combustível
        </Text>
        {fuels.map((fuel: string) => <ButtonFilter key={fuel} buttonName={fuel} category={"fuel"} filtering={filtering} />)}
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
