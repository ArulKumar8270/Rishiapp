import * as React from 'react';
import { View } from 'react-native'

import Svg, {
  G,
  Path,
  Circle,
  Rect 
} from 'react-native-svg';

function MailIcon({color,width,height}) {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="svg-icon"
    width={width || 80}
    height={height || 80}
    viewBox="0 0 1024 1024"
  >
    <Path fill={color ? color :'#ccc' } d="M927.746 221.62H96.281c-17.079 0-30.99 13.912-30.99 30.963V771.42c0 17.08 13.911 30.957 30.99 30.957h831.465c17.085 0 30.962-13.877 30.962-30.957V252.583c0-17.05-13.877-30.963-30.962-30.963zM489.612 663.906c5.99 5.996 13.964 9.307 22.386 9.307 2.884 0 5.71-.394 8.421-1.14 5.404-1.348 10.491-4.066 14.603-8.166l126.277-126.878.716-.718L899.53 768.795l-775.715.713 238.2-233.2 127.598 127.598zm22.386-20L120.931 252.842l782.91-.713-391.843 391.777zM342.326 516.621 93.738 760.717V268.033L342.326 516.62zm339.38-.002 248.585-248.586v492.655L681.707 516.619z" />
  </Svg>
  );
}

export default MailIcon;