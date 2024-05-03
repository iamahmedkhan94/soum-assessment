import { Text as BaseText } from 'react-native';
import { TextProps } from './props';
import React from 'react';
import { useMargin } from '~/hooks/useMargin';
import { useTheme } from '~/hooks/useTheme';
import { useStyles } from './hooks/useStyles';

export const Text: React.FunctionComponent<
  React.PropsWithChildren<TextProps>
> = props => {
  const {
    color,
    variant = 'body2',
    textAlign,
    ellipsizeMode,
    numberOfLines = 1,
    onPress,
    ...restProps
  } = props;

  const theme = useTheme();
  const margin = useMargin(restProps);
  const styles = useStyles();
  const textColor = color ? theme.colors[color] : undefined;
  const textStyle = variant ? styles.variants[variant] : {};

  return (
    <BaseText
      ellipsizeMode={ellipsizeMode}
      numberOfLines={ellipsizeMode ? numberOfLines : undefined}
      accessibilityRole="text"
      style={[
        {
          ...styles.base,
          textAlignVertical: 'center',
          color: textColor, // Use safely checked textColor
          ...textStyle, // Use safely checked textStyle
          textAlign: textAlign,
        },
        ...margin,
      ]}
      onPress={onPress}>
      {props.children}
    </BaseText>
  );
};
