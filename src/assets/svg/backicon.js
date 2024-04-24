import * as React from 'react';
import { View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'

import Svg, {
  G,
  Path,
  Circle,
} from 'react-native-svg';

function BackIcon({color,width,height}) {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="svg-icon"
    width={width || 80}
    height={height || 80}
    viewBox="0 0 1024 1024"
    
  >
    <Path fill={color ? color : "red" } d="M932.04 483.875H163.745l350.591-311.627c11.009-9.785 12-26.643 2.216-37.652-9.787-11.005-26.64-11.999-37.653-2.214L74.242 492.065a26.672 26.672 0 0 0 0 39.868L478.9 891.618a26.567 26.567 0 0 0 17.708 6.735c7.353 0 14.676-3.022 19.945-8.95 9.785-11.01 8.793-27.866-2.216-37.653L160.473 537.214H932.04c14.729 0 26.669-11.94 26.669-26.67 0-14.729-11.94-26.669-26.67-26.669z" />
  </Svg>
  );
}

export default BackIcon;
