import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

export const useStyles = () => {
    const theme = useTheme();
    return {
        text: {
            color: theme.colors.black,
            fontSize: 18,
        } as StyleProp<TextStyle>,
        containerStyle: {
            margin: theme.spacing.s,
            marginBottom: theme.spacing.s,
            alignItems: 'flex-start',
        } as StyleProp<ViewStyle>,
        parentStyles: {
            backgroundColor: theme.colors.white,
            marginTop: theme.spacing.xxxs,
            paddingRight: theme.spacing.s,
            borderRadius: 8,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
        } as StyleProp<ViewStyle>,
        innerContainer: {
            paddingLeft: theme.spacing.m,
        } as StyleProp<ViewStyle>,
        chevronContainer: {
            alignItems: 'center',
            justifyContent: 'center',
        } as StyleProp<ViewStyle>,
        childrenContainerStyles: {
            backgroundColor: theme.colors.white,
            paddingRight: theme.spacing.xs,
            borderRadius: 8,
            marginTop: theme.spacing.xxxs,
            alignItems: 'center',
            flexDirection: 'row',
        } as StyleProp<ViewStyle>,
        renderContainer: {
            alignItems: 'flex-start',
        } as StyleProp<ViewStyle>,
        iconView: {
            height: 32,
            width: 32,
            tintColor: theme.colors.white,
        } as StyleProp<ViewStyle>,
    };
};
