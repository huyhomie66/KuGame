import React from 'react';

import * as Svg from '../../assets/icons';

interface Props {
  name: any;
  size?: any;
  color?: any;
}

const Icon: React.FC<Props> = ({name, size = 22, color}) => {
  const SvgIcon = (Svg as any)[name];
  return <SvgIcon width={size} height={size} color={color} />;
};

export default Icon;
