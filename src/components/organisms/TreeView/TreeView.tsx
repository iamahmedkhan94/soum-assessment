import {
    cloneDeep,
    isArray,
    isEmpty,
    isNull,
    isString,
    isUndefined,
} from 'lodash';
import React, { memo, useEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import type {
    ChildItemTypes,
    ParentItemTypes,
    TreeDataTypes,
    TreeSelectTypes,
} from './types';
import { useStyles, useTreeView } from './hooks';
import { Checkbox } from '../Checkbox';
import { Text } from '~/components/atom/Text';

const ParentItem = React.memo(
    ({
        item,
        parentContainerStyles,
        onPressCheckbox,
        showChildren,
        renderIcon,
        titleKey,
        touchableActiveOpacity,
    }: ParentItemTypes) => {
        const styles = useStyles()
        return (
            <View style={styles.renderContainer}>
                <TouchableOpacity
                    activeOpacity={touchableActiveOpacity}
                    testID={`${item[titleKey]}-parent`}
                    onPress={() => showChildren(item)}
                    style={parentContainerStyles ?? styles.parentStyles}>
                    <TouchableOpacity
                        activeOpacity={touchableActiveOpacity}
                        testID={`${item[titleKey]}-press`}
                        onPress={() => {
                            onPressCheckbox(item);
                        }}
                        style={styles.chevronContainer}>
                        {renderIcon(item?.isSelected ?? false, () => onPressCheckbox(item), true)}
                    </TouchableOpacity>
                    <Text variant='body1'>
                        {item[titleKey] as string}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
);

const ChildItem = React.memo(
    ({
        item,
        childContainerStyles,
        onPressCheckbox,
        titleKey,
        onChildPress,
        renderIcon,
        touchableActiveOpacity,
    }: ChildItemTypes) => {
        const styles = useStyles()

        return (
            <TouchableOpacity
                activeOpacity={touchableActiveOpacity}
                testID={`${item[titleKey]}-child`}
                style={[styles.childrenContainerStyles, childContainerStyles]}
                onPress={() => onChildPress(item)}>
                <TouchableOpacity
                    activeOpacity={touchableActiveOpacity}
                    onPress={() => {
                        onPressCheckbox(item);
                    }}
                    testID={`${item[titleKey]}-press`}
                    style={styles.chevronContainer}>
                    {renderIcon(item?.isSelected ?? false, () => onPressCheckbox(item), true)}
                </TouchableOpacity>
                <Text variant='body1'>
                    {item[titleKey] as string}
                </Text>
            </TouchableOpacity>
        )
    }
);
export const TreeView = memo(({
    data,
    onParentPress = (_value: {}) => { },
    onChildPress = (_value: {}) => { },
    onCheckBoxPress = ([]) => { },
    parentContainerStyles,
    childContainerStyles,
    parentTextStyles,
    childTextStyles,
    autoSelectParents = true,
    autoSelectChildren = true,
    autoExpandable = false,
    titleKey = 'title',
    childKey = 'data',
    touchableActiveOpacity = 0.7,
    flatListProps,
}: TreeSelectTypes) => {
    const { listData, setListData, refresh, onPressCheckbox, showChildren } =
        useTreeView({
            data,
            onCheckBoxPress,
            autoSelectParents,
            autoSelectChildren,
            childKey,
            autoExpandable,
            onParentPress,
        });
    const styles = useStyles()
    useEffect(() => {
        data && setListData(cloneDeep(data));
    }, [data, setListData,]);

    const renderIcon = (status: boolean, onChange: () => void, isChild: boolean = false): JSX.Element => {
        return (
            <Checkbox isChecked={status} onChange={onChange} />
        );
    };

    const renderTree = ({ item }: { item: TreeDataTypes }) => {
        if (isUndefined(item.isExpanded)) {
            item.isExpanded = false;
        }

        if (isUndefined(item.isSelected)) {
            item.isSelected = false;
        }

        const hasTitle = isString(item?.[titleKey]);
        const hasChildren = isArray(item?.[childKey]) && !isEmpty(item[childKey]);

        return (
            <>
                {hasTitle && hasChildren && (
                    <ParentItem
                        {...{
                            item,
                            parentContainerStyles,
                            parentTextStyles,
                            onPressCheckbox,
                            showChildren,
                            renderIcon,
                            titleKey,
                            childKey,
                            touchableActiveOpacity,
                        }}
                    />
                )}
                {hasTitle && isEmpty(item?.[childKey]) && (
                    <ChildItem
                        {...{
                            item,
                            childContainerStyles,
                            childTextStyles,
                            onPressCheckbox,
                            titleKey,
                            onChildPress,
                            renderIcon,
                            touchableActiveOpacity,
                        }}
                    />
                )}
                {!isNull(item?.[childKey]) && item.isExpanded && (
                    <View style={styles.innerContainer}>
                        <FlatList
                            data={item[childKey] as Array<TreeDataTypes>}
                            renderItem={({ item: itemName }) => {
                                if (!itemName.parent) {
                                    itemName.parent = item;
                                }
                                return renderTree({ item: itemName });
                            }}
                        />
                    </View>
                )}
            </>
        );
    };


    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            {...flatListProps}
            contentContainerStyle={styles.containerStyle}
            data={listData}
            renderItem={renderTree}
            keyExtractor={(_item, index) => index.toString()}
            extraData={refresh}
        />
    );
});