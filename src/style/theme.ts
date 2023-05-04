import { extendTheme } from "@chakra-ui/react";

const brand = {
  brand: {
    1: "#4529E6",
    2: "#5126EA",
    3: "#B0A6F0",
    4: "#EDEAFD",
  },
};

const greyScale = {
  grey: {
    0: "#0B0D0D",
    1: "#212529",
    2: "#495057",
    3: "#868E96",
    4: "#ADB5BD",
    5: "#CED4DA",
    6: "#DEE2E6",
    7: "#E9ECEF",
    8: "#F1F3F5",
    9: "#F8F9FA",
    10: "#FDFDFD",
  },
  whiteFixed: "#FFFFFF",
};

const feedback = {
  alert: {
    1: "#CD2B31",
    2: "#FDD8D8",
    3: "#FFE5E5",
  },
  success: {
    1: "#18794E",
    2: "#CCEBD7",
    3: "#DDF3E4",
  },
};

const colorsRandomProfile = {
  random: {
    1: "#E34D8C",
    2: "#C04277",
    3: "#7D2A4D",
    4: "#7000FF",
    5: "#6200E3",
    6: "#36007D",
    7: "#349974",
    8: "#2A7D5F",
    9: "#153D2E",
    10: "#6100FF",
    11: "#5700E3",
    12: "#30007D",
  },
};

const typography = {
  heading_1_700: {
    fontFamily: "Lexend",
    fontWeight: "700",
    fontSize: "44px",
  },
  heading_2_600: {
    fontFamily: "Lexend",
    fontWeight: "600",
    fontSize: "36px",
  },
  heading_3_600: {
    fontFamily: "Lexend",
    fontWeight: "600",
    fontSize: "32px",
  },
  heading_3_500: {
    fontFamily: "Lexend",
    fontWeight: "500",
    fontSize: "32px",
  },
  heading_4_600: {
    fontFamily: "Lexend",
    fontWeight: "600",
    fontSize: "28px",
  },
  heading_4_500: {
    fontFamily: "Lexend",
    fontWeight: "500",
    fontSize: "28px",
  },
  heading_5_600: {
    fontFamily: "Lexend",
    fontWeight: "600",
    fontSize: "24px",
  },
  heading_5_500: {
    fontFamily: "Lexend",
    fontWeight: "500",
    fontSize: "24px",
  },
  heading_6_600: {
    fontFamily: "Lexend",
    fontWeight: "600",
    fontSize: "20px",
  },
  heading_6_500: {
    fontFamily: "Lexend",
    fontWeight: "500",
    fontSize: "20px",
  },
  heading_7_600: {
    fontFamily: "Lexend",
    fontWeight: "600",
    fontSize: "16px",
  },
  heading_7_500: {
    fontFamily: "Lexend",
    fontWeight: "500",
    fontSize: "16px",
  },
  body_1_400: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: "16px",
  },
  body_1_500: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: "36px",
  },
  body_1_600: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: "16px",
  },
  body_2_400: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: "14px",
  },
  body_2_500: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: "14px",
  },
  button_big_text: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: "16px",
  },
  button_medium_text: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: "14px",
  },
  input_placeholder: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: "16px",
  },
  input_label: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: "14px",
  },
};

const buttons = {
  baseStyle: {
    fontWeight: "bold",
    border: "1.5px solid",
    borderRadius: "4px",
    display: "flex",
    alignItens: "center",
    justifyContent: "center",
  },
  sizes: {
    big: {
      py: "12px",
      px: "28px",
      textStyle: "button_big_text",
    },
    medium: {
      py: "12px",
      px: "20px",
      textStyle: "button_medium_text",
    },
    small: {
      py: "0px",
      px: "0px",
    },
  },
  variants: {
    default: {
      bg: "brand.1",
      borderColor: "brand.1",
      color: "whiteFixed",
      _hover: {
        bg: "brand.2",
        borderColor: "brand.2",
      },
    },
    warning: {
      bg: "alert.3",
      borderColor: "alert.3",
      color: "alert.1",
      _hover: {
        bg: "alert.2",
        borderColor: "alert.2",
      },
    },
    suces: {
      bg: "success.3",
      borderColor: "success.3",
      color: "success.1",
      _hover: {
        bg: "success.2",
        borderColor: "success.2",
      },
    },
    grey1: {
      bg: "grey.0",
      borderColor: "grey.0",
      color: "whiteFixed",
      _hover: {
        bg: "grey.1",
        borderColor: "grey.1",
      },
    },
    negative: {
      bg: "grey.5",
      borderColor: "grey.5",
      color: "grey.2",
      _hover: {
        bg: "grey.6",
        borderColor: "grey.6",
      },
    },
    disable: {
      bg: "grey.5",
      borderColor: "grey.5",
      color: "whiteFixed",
    },
    ghost: {
      bg: "transparent",
      borderColor: "transparent",
      color: "grey.0",
      _hover: {
        bg: "transparent",
        borderColor: "transparent",
      },
    },
    brandOpacity: {
      bg: "brand.4",
      borderColor: "brand.4",
      color: "brand.1",
    },
    ligth: {
      bg: "whiteFixed",
      borderColor: "whiteFixed",
      color: "grey.1",
    },
    outlineLigth: {
      bg: "transparent",
      borderColor: "grey.10",
      color: "grey.10",
      _hover: {
        bg: "whiteFixed",
        color: "grey.1",
      },
    },
    outline1: {
      bg: "transparent",
      borderColor: "grey.0",
      color: "grey.0",
      _hover: {
        bg: "grey.1",
        color: "whiteFixed",
        borderColor: "grey.1",
      },
    },
    outline2: {
      bg: "transparent",
      borderColor: "grey.4",
      color: "grey.0",
      _hover: {
        bg: "grey.1",
        color: "whiteFixed",
        borderColor: "grey.1",
      },
    },
    outlineBrand: {
      bg: "transparent",
      borderColor: "brand.1",
      color: "brand.1",
      _hover: {
        bg: "brand.4",
      },
    },
    link: {
      bg: "transparent",
      borderColor: "transparent",
      color: "grey.0",
      _hover: {
        bg: "grey.8",
        borderColor: "grey.8",
      },
    },
    link2: {
      bg: "transparent",
      borderColor: "transparent",
      color: "grey.0",
      fontWeight: "regular",
      _hover: {
        bg: "grey.8",
        borderColor: "grey.8",
      },
    },
    brandDisable: {
      bg: "brand.3",
      borderColor: "brand.3",
      color: "brand.4",
    },
  },
  defaultProps: {
    size: "big",
    variant: "default",
  },
};

const inputs = {
  variants: {
    filter: {
      bg: "grey.5",
      borderColor: "grey.5",
      _hover: {
        borderColor: "grey.3",
      },
      _focus: {
        borderColor: "grey.7",
        boxShadow: "none",
      },
    },
  },
};

export const theme = extendTheme({
  colors: {
    ...brand,
    ...greyScale,
    ...feedback,
    ...colorsRandomProfile,
  },
  textStyles: {
    ...typography,
  },
  components: {
    Button: {
      ...buttons,
    },
    Input: {
      ...inputs,
    },
  },
  breakpoints: {
    sm2: "450px",
  },
});
