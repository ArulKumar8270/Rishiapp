import * as React from 'react';
import { View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'

import Svg, {
  G,
  Path,
  Circle,
} from 'react-native-svg';

function CurrentLocation({color,width,height, style}) {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="svg-icon"
    width={width || 100}
    height={height || 100}
    viewBox="0 0 1024 1024"
    style={style}
    
  >
    <Path fill={color ? color : "red" } d="M432 512a80 80 0 1 0 160 0 80 80 0 1 0-160 0Z" />
    <Path fill={color ? color : "red" } d="M960 480h-33.632C910.752 276.16 747.84 113.248 544 97.632V64a32 32 0 1 0-64 0v33.632C276.16 113.248 113.248 276.16 97.632 480H64a32 32 0 0 0 0 64h33.632C113.248 747.84 276.16 910.752 480 926.368V960a32 32 0 1 0 64 0v-33.632C747.84 910.752 910.752 747.84 926.368 544H960a32 32 0 1 0 0-64zM544 862.368V800a32 32 0 1 0-64 0v62.368C311.424 847.104 176.896 712.576 161.632 544H224a32 32 0 1 0 0-64h-62.368C176.896 311.424 311.424 176.896 480 161.632V224a32 32 0 0 0 64 0v-62.368C712.576 176.928 847.104 311.424 862.368 480H800a32 32 0 1 0 0 64h62.368C847.104 712.576 712.576 847.104 544 862.368z" />
  </Svg>
  );
}

export default CurrentLocation;
