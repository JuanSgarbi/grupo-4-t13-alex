import { Button } from "@chakra-ui/react";


export const ButtonFilter = ({ buttonName, category, filtering }) => {
  return (
    <Button
      onClick={() => filtering(category, buttonName)}
      variant={"link"}
      justifyContent={"flex-start"}
      textStyle={"heading_6_500"}
      color={"grey.3"}
      lineHeight={"25px"}
      maxW={"max-content"}
    >
      {buttonName}
    </Button>
  );
};
