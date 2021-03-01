//@ts-ignore
import {create} from 'react-native-pixel-perfect';
import UltimateConfig from 'react-native-ultimate-config';

const designResolution = {
  width: parseInt(UltimateConfig.DESIGN_WIDTH, 10),
  height: parseInt(UltimateConfig.DESIGN_HEIGHT, 10),
};
const perfectSize = create(designResolution);

const scaler = (size: any) => perfectSize(size);

export default scaler;
