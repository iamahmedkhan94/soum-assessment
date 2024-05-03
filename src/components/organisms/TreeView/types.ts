import type {
    ImageStyle,
    StyleProp,
    TextStyle,
    ViewStyle,
    FlatListProps,
  } from 'react-native';
  
  interface GenericTreeDataType {
    [key: string]:
      | TreeDataTypes[]
      | string
      | number
      | boolean
      | undefined
      | TreeDataTypes;
  }
  
  export interface TreeDataTypes extends GenericTreeDataType {
    isExpanded?: boolean;
    isSelected?: boolean;
    parent?: TreeDataTypes;
  }
  
  export type TreeSelectTypes = Partial<{
    data: TreeDataTypes[];
    childKey: string;
    titleKey: string;
    renderArrowOpen: JSX.Element;
    renderArrowClosed: JSX.Element;
    renderSelect: JSX.Element;
    renderUnSelect: JSX.Element;
    autoSelectParents: boolean;
    autoSelectChildren: boolean;
    autoExpandable: boolean;
    onParentPress: (item: TreeDataTypes) => void;
    onChildPress: (item: TreeDataTypes) => void;
    onCheckBoxPress: (item: TreeDataTypes[]) => void;
    leftIconStyles: StyleProp<ImageStyle>;
    rightIconStyles: StyleProp<ImageStyle>;
    parentContainerStyles: StyleProp<ViewStyle>;
    parentTextStyles: StyleProp<TextStyle>;
    childContainerStyles: StyleProp<ViewStyle>;
    childTextStyles: StyleProp<TextStyle>;
    touchableActiveOpacity: number;
    flatListProps: Omit<
      FlatListProps<any>,
      'data' | 'renderItem' | 'keyExtractor' | 'extraData'
    >;
  }>;
  
  export interface ChildItemTypes {
    item: TreeDataTypes;
    childContainerStyles: StyleProp<ViewStyle>;
    childTextStyles: StyleProp<TextStyle>;
    onPressCheckbox: (item: TreeDataTypes) => void;
    titleKey: string;
    onChildPress: (item: TreeDataTypes) => void;
    renderIcon: (isSelected: boolean, onChange:() => void ,isChild: boolean) => JSX.Element;
    touchableActiveOpacity: number;
  }
  
  export interface ParentItemTypes {
    item: TreeDataTypes;
    parentContainerStyles: StyleProp<ViewStyle>;
    parentTextStyles: StyleProp<TextStyle>;
    onPressCheckbox: (item: TreeDataTypes) => void;
    showChildren: (item: TreeDataTypes) => void;
    renderIcon: (isSelected: boolean, onChange:() => void ,isChild: boolean) => JSX.Element;
    titleKey: string;
    childKey: string;
    touchableActiveOpacity: number;
  }
  
  export interface TreeSelectHookTypes {
    data: TreeDataTypes[] | undefined;
    onCheckBoxPress: (item: TreeDataTypes[]) => void;
    onParentPress: (item: TreeDataTypes) => void;
    autoSelectParents: boolean;
    autoSelectChildren: boolean;
    childKey: string;
    autoExpandable: boolean;
  }