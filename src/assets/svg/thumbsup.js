import * as React from 'react';
import { View } from 'react-native'

import Svg, {
  G,
  Path,
  Circle,
  Rect 
} from 'react-native-svg';

function Thumbsup({color,width,height}) {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="svg-icon"
    width={width || 100}
  height={height || 100}
    viewBox="0 0 1024 1024"
   
  >
    <Path fill={color ? color : "red" } d="M780.8 981.333H170.667c-72.534 0-128-55.466-128-128V554.667c0-72.534 55.466-128 128-128h102.4l157.866-358.4c4.267-17.067 21.334-25.6 38.4-25.6C563.2 42.667 640 119.467 640 213.333v128h221.867c34.133 4.267 64 21.334 85.333 51.2 21.333 25.6 29.867 59.734 21.333 93.867l-59.733 384c-12.8 64-64 110.933-128 110.933zM341.333 896H780.8c21.333 0 38.4-17.067 42.667-34.133l59.733-384c0-12.8 0-21.334-8.533-29.867-8.534-8.533-17.067-17.067-29.867-17.067H597.333c-25.6 0-42.666-17.066-42.666-42.666V213.333c0-38.4-25.6-68.266-59.734-81.066l-153.6 345.6V896zM170.667 512c-25.6 0-42.667 17.067-42.667 42.667v298.666c0 25.6 17.067 42.667 42.667 42.667H256V512h-85.333z" />
  </Svg>
  );
}
function ThumbsDown({color,width,height}) {
    return (
        <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg-icon"
        width={width || 100}
        height={height || 100}
        viewBox="0 0 1024 1024"
        
      >
        <Path fill={color ? color : "red" } d="M554.667 981.333C460.8 981.333 384 904.533 384 810.667v-128H162.133c-68.266-8.534-119.466-76.8-106.666-145.067l59.733-384c12.8-64 64-110.933 128-110.933h597.333c68.267 0 128 51.2 140.8 123.733v307.2c-8.533 72.533-72.533 123.733-140.8 123.733H755.2l-157.867 358.4c-8.533 17.067-25.6 25.6-42.666 25.6zm-128-384c25.6 0 42.666 17.067 42.666 42.667v170.667c0 38.4 25.6 68.266 59.734 81.066l153.6-345.6V128H243.2c-21.333 0-38.4 17.067-42.667 38.4l-59.733 384c-4.267 21.333 12.8 46.933 34.133 46.933h251.734zM768 512h72.533c29.867 0 51.2-17.067 55.467-46.933V174.933c-4.267-25.6-29.867-46.933-55.467-46.933H768v384z" />
      </Svg>
    );
  }
export {Thumbsup,ThumbsDown};
