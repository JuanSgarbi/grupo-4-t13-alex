import { extendTheme } from '@chakra-ui/react';

const brand = {
    brand1: '#4529E6',
    brand2: '#5126EA',
    brand3: '#B0A6F0',
    brand4: '#EDEAFD'
}

const greyScale = {
    grey0: '#0B0D0D',
    grey1: '#212529',
    grey2: '#495057',
    grey3: '#868E96',
    grey4: '#ADB5BD',
    grey5: '#CED4DA',
    grey6: '#DEE2E6',
    grey7: '#E9ECEF',
    grey8: '#F1F3F5',
    grey9: '#F8F9FA',
    grey10: '#FDFDFD',
    whiteFixed: '#FFFFFF'
}

const feedback = {
    alert1: '#CD2B31',
    alert2: '#FDD8D8',
    alert3: '#FFE5E5',
    sucess1: '#18794E',
    sucess2: '#CCEBD7',
    sucess3: '#DDF3E4'
}

const colorsRandomProfile = {
    random1: '#E34D8C',
    random2: '#C04277',
    random3: '#7D2A4D',
    random4: '#7000FF',
    random5: '#6200E3',
    random6: '#36007D',
    random7: '#349974',
    random8: '#2A7D5F',
    random9: '#153D2E',
    random10: '#6100FF',
    random11: '#5700E3',
    random12: '#30007D',
}

const typography = {
    heading_1_700: {
        fontFamily: 'Lexend',
        fontWeight: '700',
        fontSize: '44px'
    },
    heading_2_600: {
        fontFamily: 'Lexend',
        fontWeight: '600',
        fontSize: '36px'
    },
    heading_3_600: {
        fontFamily: 'Lexend',
        fontWeight: '600',
        fontSize: '32px'
    },
    heading_3_500: {
        fontFamily: 'Lexend',
        fontWeight: '500',
        fontSize: '32px'
    },
    heading_4_600: {
        fontFamily: 'Lexend',
        fontWeight: '600',
        fontSize: '28px'
    },
    heading_4_500: {
        fontFamily: 'Lexend',
        fontWeight: '500',
        fontSize: '28px'
    },
    heading_5_600: {
        fontFamily: 'Lexend',
        fontWeight: '600',
        fontSize: '24px'
    },
    heading_5_500: {
        fontFamily: 'Lexend',
        fontWeight: '500',
        fontSize: '24px'
    },
    heading_6_600: {
        fontFamily: 'Lexend',
        fontWeight: '600',
        fontSize: '20px'
    },
    heading_6_500: {
        fontFamily: 'Lexend',
        fontWeight: '500',
        fontSize: '20px'
    },
    heading_7_600: {
        fontFamily: 'Lexend',
        fontWeight: '600',
        fontSize: '16px'
    },
    heading_7_500: {
        fontFamily: 'Lexend',
        fontWeight: '500',
        fontSize: '16px'
    },
    body_1_400: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: '16px'
    },
    body_1_600: {
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: '16px'
    },
    body_2_400: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: '14px'
    },
    body_2_500: {
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: '14px'
    },
    button_big_text: {
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: '16px'
    },
    button_medium_text: {
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: '16px'
    },
    input_placeholder: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: '16px'
    },
    input_label: {
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: '14px'
    }
}

export const theme = extendTheme({
    colors: {
        ...brand,
        ...greyScale,
        ...feedback,
        ...colorsRandomProfile
    },
    textStyle: {
        ...typography
    }
});

