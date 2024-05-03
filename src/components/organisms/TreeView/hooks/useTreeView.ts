import { cloneDeep, isNull, isObject } from 'lodash';
import { useState } from 'react';
import type { TreeDataTypes, TreeSelectHookTypes } from '../types';

let selectItem: TreeDataTypes[] = [];

export const useTreeView = ({
  data,
  onCheckBoxPress,
  onParentPress,
  autoSelectParents,
  autoSelectChildren,
  childKey,
  autoExpandable,
}: TreeSelectHookTypes) => {
  const [refresh, setRefresh] = useState(false);
  const [listData, setListData] = useState<TreeDataTypes[]>(
    cloneDeep(data || [])
  );

  const selectAll = (item: TreeDataTypes) => {
    if (autoSelectParents && item?.parent) {
      selectParentItems(item?.parent);
    }
  };

  const onSelectOrUnselect = (item: TreeDataTypes, isSelect: boolean) => {
    item.isSelected = isSelect;
    selectAll(item);
    if (
      autoSelectChildren &&
      item[childKey] &&
      isObject(item[childKey]) &&
      !isNull(item[childKey])
    ) {
      (item[childKey] as Array<TreeDataTypes>)?.forEach(
        (child: TreeDataTypes) => onSelectOrUnselect(child, isSelect)
      );
    }
    reload();
  };

  const reload = () => {
    setRefresh(!refresh);
    selectItem = [];
    selectChildrenItems(listData);
  };

  const selectParentItems = (item: TreeDataTypes) => {
    const children = (item?.[childKey] as Array<TreeDataTypes>) ?? [];
    if (children?.length > 0) {
      const check = (item[childKey] as Array<TreeDataTypes>).filter(
        (child: TreeDataTypes) => !child?.isSelected
      );
      item.isSelected = check.length === 0;
    }
    if (item.parent) {
      selectParentItems(item.parent);
    }
    reload();
  };

  const selectChildrenItems = (childData: TreeDataTypes[]) => {
    childData.forEach((item: TreeDataTypes) => {
      if (item.isSelected) {
        selectItem.push(item);
      }
      if (Array.isArray(item[childKey])) {
        selectChildrenItems(item[childKey] as Array<TreeDataTypes>);
      }
    });
  };

  const showChildren = (item: TreeDataTypes) => {
    item.isExpanded = !item?.isExpanded;
    onParentPress(item);
    reload();
  };

  const onPressCheckbox = (item: TreeDataTypes) => {
    if (!item?.isSelected && autoExpandable) {
      item.isExpanded = !item?.isSelected;
    }
    if (!item?.isSelected) {
      onSelectOrUnselect(item, true);
    } else {
      onSelectOrUnselect(item, false);
    }
    onCheckBoxPress(listData);
  };

  return {
    selectAll,
    onPressCheckbox,
    showChildren,
    setListData,
    listData,
    refresh,
  };
};
