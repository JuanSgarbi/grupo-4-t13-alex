import { Button } from "@chakra-ui/react";

interface iButtonName {
  buttonName: string;
}

export const ButtonFilter = (props: iButtonName) => {
  return (
    <Button
      onClick={() => console.log(props.buttonName)}
      variant={"link"}
      justifyContent={"flex-start"}
      textStyle={"heading_6_500"}
      color={"grey.3"}
      lineHeight={"25px"}
      maxW={"max-content"}
    >
      {props.buttonName}
    </Button>
  );
};
