import * as React from 'react';
import { View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'

import Svg, {
  G,
  Path,
  Circle,
} from 'react-native-svg';

function WalletIcon({color,width,height}) {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="svg-icon"
    width={width || 80}
    height={height || 80}
    viewBox="0 0 1024 1024"

  >
    <Path  fill={color ? color : "red" } d="M905.31 688.873c-13.965 0-25.6 11.636-25.6 25.6v132.654c0 27.928-23.274 51.2-51.2 51.2H104.726c-27.927 0-51.2-23.272-51.2-51.2V176.873c0-27.928 23.273-51.2 51.2-51.2H828.51c27.927 0 51.2 23.272 51.2 51.2v139.636c0 13.964 11.636 25.6 25.6 25.6 13.964 0 25.6-11.636 25.6-25.6V172.22c0-53.528-44.218-97.746-97.745-97.746H97.745C44.218 72.145 0 116.363 0 172.218v679.564c0 53.527 44.218 97.745 97.745 97.745h735.419c53.527 0 97.745-44.218 97.745-97.745v-137.31c2.327-13.963-9.309-25.6-25.6-25.6zm20.945-309.528H546.909c-51.2 0-93.09 39.564-97.745 88.437v86.109c0 53.527 44.218 97.745 97.745 97.745h379.346c53.527 0 97.745-44.218 97.745-97.745v-76.8c0-53.527-44.218-97.746-97.745-97.746zM972.8 549.236c0 27.928-23.273 51.2-51.2 51.2H553.89c-27.926 0-51.2-23.272-51.2-51.2v-67.49c0-27.928 23.274-51.2 51.2-51.2H921.6c27.927 0 51.2 23.272 51.2 51.2v67.49zm-81.455-65.163c-18.618 0-32.581 13.963-32.581 32.582 0 18.618 13.963 32.581 32.581 32.581 18.619 0 32.582-13.963 32.582-32.581-2.327-18.619-16.29-32.582-32.582-32.582z" />
  </Svg>
  );
}

export default WalletIcon;
