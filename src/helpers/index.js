// Importing responsive screen utilities for width and height
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Function to calculate responsive width
const getWidth = (width) => wp(width);

// Function to calculate responsive height
const getHeight = (height) => hp(height);

// Exporting the getWidth and getHeight functions
export { getWidth, getHeight };
