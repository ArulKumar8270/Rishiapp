import * as React from 'react';
import { View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'

import Svg, {
  G,
  Path,
  Circle,
} from 'react-native-svg';

function PencilIcon({color,width,height}) {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="svg-icon"
    width={width || 80}
    height={height || 80}
    viewBox="0 0 1024 1024"
  >
    <Path fill={color ? color : "red" } d="M837.818 15.267s-34.301-34.302-68.603 0L68.762 715.72 50.91 733.572 245.98 928.69l28.593 28.593 15.82 15.82 34.205-34.204-.048-.049 547.377-547.376.048.048 34.205-34.205-.048-.048 102.566-102.567c34.302-34.302 0-68.604 0-68.604L837.818 15.267zm-547.57 889.282L119.417 733.717l547.376-547.425 170.832 170.831L290.248 904.55zM871.83 322.967 700.998 152.135 803.565 49.57 974.396 220.4 871.83 322.967z" />
    <Path fill={color ? color : "red" } d="m66.246 957.719 35.996-172.767-51.913-51.912L.062 1023.952l290.283-50.945-15.772-15.724-28.545-28.593Z" />
  </Svg>
  );
}

export default PencilIcon;
