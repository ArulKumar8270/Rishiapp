import * as React from 'react';
import { View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'

import Svg, {
  G,
  Path,
  Circle,
} from 'react-native-svg';

function Dprofile({color,width,height,style}) {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="svg-icon"
    width={width || 100}
    height={height || 100}
    viewBox="0 0 1024 1024"
    style={style}
  >
    <Path
      fill={color ? color : "red" }
      d="M513.141 515.11c114.169 0 206.641-92.472 206.641-206.641S627.31 101.828 513.141 101.828 306.499 194.3 306.499 308.469 398.971 515.11 513.141 515.11zm0 103.32c-137.933 0-413.282 69.225-413.282 206.641v103.32h826.564v-103.32c-.001-137.416-275.35-206.641-413.282-206.641z"
    />
  </Svg>
  );
}

export default Dprofile;
