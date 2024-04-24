import * as React from 'react';
import { View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'

import Svg, {
  G,
  Path,
  Circle,
} from 'react-native-svg';

function Dropdown({color,width,height}) {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="svg-icon"
    width={width || 100}
    height={height || 100}
    viewBox="0 0 1024 1024"

  >
    <Path fill={color ? color : "red" } d="M993.28 261.94a26.624 26.624 0 0 0-37.683 0L512 705.535 68.403 261.939a26.624 26.624 0 0 0-37.683 37.683l462.438 462.439a26.624 26.624 0 0 0 37.684 0L993.28 299.622a26.624 26.624 0 0 0 0-37.683z" />
  </Svg>
  );
}

export default Dropdown;
