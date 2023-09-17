import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const getWidth = (width) => wp(width);
const getHeight = (height) => hp(height);

export { getWidth, getHeight };
