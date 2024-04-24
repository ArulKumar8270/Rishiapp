import * as React from 'react';
import { View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'

import Svg, {
  G,
  Path,
  Circle,
} from 'react-native-svg';

function SideMenuIcon({color,width,height}) {
  return (
    // <View>
    //   <FontAwesomeIcon icon={faBars} size={20}/>
    // </View>
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="svg-icon"
    width={width || 100}
    height={height || 100}
    viewBox="0 0 1024 1024"
    
  >
    <Path
      fill="#040000"
      d="M204.805 112.645h819.189v102.399H204.805zm0 348.156h716.79v102.398h-716.79zm0 348.155h511.993v102.399H204.805zM.006 112.645h102.399v102.399H.006zm0 348.156h102.399v102.398H.006zm0 348.155h102.399v102.399H.006z"
    />
  </Svg>
  );
}

export default SideMenuIcon;
