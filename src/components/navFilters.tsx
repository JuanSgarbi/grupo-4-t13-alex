import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { ButtonFilter } from "./buttonFilter";
import { useState } from "react";

export const NavFilters = ({ filtering, filteringPriceKm, setFilteredAnnouncements, setIsFiltered, isFiltered, brands, models, colors, years, fuels }) => {
  const [kmMin, setKmMin] = useState<string>("")
  const [kmMax, setKmMax] = useState<string>("")
  const [priceMin, setPriceMin] = useState<string>("")
  const [priceMax, setPriceMax] = useState<string>("")

  const setKmMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKmMin(event.target.value)
  }

  const setKmMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKmMax(event.target.value)
  }

  const setPriceMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMin(event.target.value)
  }

  const setPriceMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMax(event.target.value)
  }

  const reseteFilters = () => {
    setFilteredAnnouncements([])
  }

  const resetInputsFilter = () => {
    setKmMin("")
    setKmMax("")
    setPriceMin("")
    setPriceMax("")
    setIsFiltered(false)
    setFilteredAnnouncements([])
  }

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
      <Button variant={"link"} w={"100%"} mt={"2rem"} mb={"1rem"} color={"brand.2"}
        textStyle={"heading_7_500"} onClick={() => reseteFilters()}>
        Limpar filtros
      </Button>
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
          value={kmMin}
          onChange={setKmMinChange}
        ></Input>
        <Input
          placeholder={"Máxima"}
          bg="grey.5"
          textStyle={"heading_7_600"}
          border={"none"}
          borderRadius={"none"}
          focusBorderColor="transparent"
          value={kmMax}
          onChange={setKmMaxChange}
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
          value={priceMin}
          onChange={setPriceMinChange}
        ></Input>
        <Input
          placeholder={"Máxima"}
          bg="grey.5"
          textStyle={"heading_7_600"}
          border={"none"}
          borderRadius={"none"}
          focusBorderColor="transparent"
          value={priceMax}
          onChange={setPriceMaxChange}
        ></Input>
      </Flex>
      {isFiltered == false ? (<Button margin={"0 auto"} marginY={"1rem"} w={"90%"} onClick={() => filteringPriceKm(kmMin, kmMax, priceMin, priceMax)}>
        Ver anúncios
      </Button>) : (<Button margin={"0 auto"} marginY={"1rem"} w={"90%"} onClick={() => resetInputsFilter()}>
        Limpar filtros
      </Button>)}

    </Flex>
  );
};
