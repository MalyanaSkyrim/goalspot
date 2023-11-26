import React from 'react';
import {Text, TextProps} from 'react-native';
import classMerge from '../../utils/classMerge';

const TextField = ({className, style, ...props}: TextProps) => {
  return (
    <Text
      {...props}
      style={style}
      className={classMerge(className, 'font-Lato')}>
      {props.children}
    </Text>
  );
};

export default TextField;
