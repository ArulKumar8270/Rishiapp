import { Dimensions, PixelRatio, Platform } from "react-native";
const { width, height } = Dimensions.get("window");

 const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
} = Dimensions.get('window');

const widthBaseScale = SCREEN_WIDTH / 414;
const heightBaseScale = SCREEN_HEIGHT / 896;

 function normalize(size, based = 'width') {
    const newSize = (based === 'height') ?
        size * heightBaseScale : size * widthBaseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}


// based on iphone 5s's scale
const scale = SCREEN_WIDTH / (Platform.OS === 'ios' ? 350 : 320);


//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = Platform.OS === 'ios' ? 350 : 335;

export function normalizeFont(size) {
    const newSize = size * (width / guidelineBaseWidth)
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1.5
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1.50
    }
}


//for width  pixel
const widthPixel = (size) => {
    return normalize(size, 'width');
};
//for height  pixel
const heightPixel = (size) => {
    return normalize(size, 'height');
};
//for font  pixel
const fontPixel = (size) => {
    return heightPixel(size);
};
//for Margin and Padding vertical pixel
const pixelSizeVertical = (size) => {
    return heightPixel(size);
};
//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size) => {
    return widthPixel(size);
};

export const colors = {
    colorPrimary: '#000',
    colorSecondary: '#000',
    mainBackground1: '#FFFFFF',
    mainBackground2: '#FFFFFF',
    textDisableColor: '#50588744',
    headingTextColor: '#343C6A',
    borderColor: '#DFEAF2',
    buttonColor: '#347AF0',
    white: '#FFFFFF',
    red: '#FF3322',
    secondaryButtonTextColor: '#718EBF',
    redeemText: '#117F3F',
    headingTextColor: '#6B6B6B',
    textColor: '#6B6B6B',
    blackColor: '#000',
    notice_color: '#001033',
    textColorgrey: '#585858',
    dividerColor: '#bbb',
    textColorWhite: '#ffffffff',
    detail_bacgroundColor: '#f9f9f9',

    grey: '#808080',
    darkGrey: '#2b2727',
    lightGreen: '#00ffce',


}

export const fontSize = {

    amountFont: normalizeFont(30),//fontPixel(24),
    header1: normalizeFont(22),//fontPixel(24),
    header2: normalizeFont(18),//fontPixel(20),
    header3: normalizeFont(16),//fontPixel(18),

    textNormal: normalizeFont(12),// fontPixel(15),
    textSmall: normalizeFont(10),// fontPixel(12),
    textLarge: normalizeFont(14),// fontPixel(16),

    textExtraSmall: normalizeFont(9),// fontPixel(12),
}


export const SIZES = {
    // global sizes
    base: 8,
    font: normalizeFont(14),
    radius: 12,
    padding: 24,
    padding1:36,
    padding2:48,
    padding3:60,
    padding4:72,
    padding5:84,
    margin:96,
    margin1:108,

    // font sizes
    largeTitle: normalizeFont(40),
    pinFont: normalizeFont(25),//fontPixel(20),
    h1: normalizeFont(18),//fontPixel(20),
    h2: normalizeFont(16),//fontPixel(18),
    h3: normalizeFont(14),// fontPixel(16),
    h4: normalizeFont(12),// fontPixel(14),
    h5: normalizeFont(10),//fontPixel(12),
    body1: normalizeFont(18),//fontPixel(20),
    body2: normalizeFont(16),//fontPixel(18),
    body3: normalizeFont(14),//fontPixel(16),
    body4: normalizeFont(12),// fontPixel(14),
    body5: normalizeFont(10),//fontPixel(12),
    body13: normalizeFont(13),//fontPixel(12),
    body11: normalizeFont(11),//fontPixel(12),
    body15: normalizeFont(15),//fontPixel(16),
    // app dimensions
    width,
    height,

    iconWidthSize: width * 0.05,
    iconHeightSize: width * 0.05
};