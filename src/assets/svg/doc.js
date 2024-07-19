import * as React from 'react';
import { View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'

import Svg, {
  G,
  Path,
  Circle,
} from 'react-native-svg';

function Doc({color,width,height,style}) {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="svg-icon"
    width={width || 100}
    height={height || 100}
    style={style}
    viewBox="0 0 1024 1024"
  >
    <Path  fill={color ? color : "red" } d="M798.72 286.72H614.4V102.4h40.96v143.36h143.36v40.96z" />
    <Path  fill={color ? color : "red" } d="M819.2 942.08H204.8V81.92h438.682L819.2 257.638zm-573.44-40.96h532.48V274.842L626.278 122.88H245.76z" />
  </Svg>
  );
}

export default Doc;
