import * as React from 'react';
import { View } from 'react-native'

import Svg, {
  G,
  Path,
  Circle,
  Rect 
} from 'react-native-svg';

function LocationIcon({color,width,height}) {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="svg-icon"
    width={width || 80}
    height={height || 80}
    viewBox="0 0 1024 1024"

  >
    <Path fill={color ? color :'#ccc' } d="M509.6 906.6c-8.3 0-15.6-5.1-29.1-20.2-9-10-20.4-24.4-33.2-41.6-28.6-38.5-60.4-86.3-89.4-134.5-46.6-77.4-124.7-220.9-124.7-312.2 0-74.2 28.9-144 81.4-196.5 52.5-52.5 122.3-81.4 196.5-81.4s144 28.9 196.5 81.4c52.5 52.5 81.4 122.3 81.4 196.5 0 56.3-32.5 148.5-89.2 252.9-53.8 99.2-120.4 192.9-178 250.6-3.2 3.2-7.6 5-12.2 5zm1.5-754.4c-135.6 0-245.9 110.3-245.9 245.9 0 60 40.4 161.3 113.8 285.2 27.3 46 57.8 92.9 86.1 131.8 21.7 29.9 35.6 46.3 43.2 54.4 53.4-56.1 113.8-142.4 163.3-233.7 53.4-98.5 85.3-187.3 85.3-237.7.1-135.6-110.2-245.9-245.8-245.9z" />
    <Path fill={color ? color :'#ccc' } d="M513.3 529.4c-67.1 0-121.7-54.6-121.7-121.7S446.2 286 513.3 286 635 340.6 635 407.7s-54.6 121.7-121.7 121.7zm0-211.5c-49.5 0-89.7 40.3-89.7 89.7s40.3 89.7 89.7 89.7S603 457 603 407.6s-40.2-89.7-89.7-89.7z" />
  </Svg>
  );
}

export default LocationIcon;