import { MockDataType } from "../mock-data/data";

type ChangeListDataItemType = {
    isSelected: boolean
}

export const getSelectedProducts = (lData: unknown): string[] => {
    const listData = lData as MockDataType[];
    let str: string[] = [];
    for (let i = 0; i < listData.length; i++) {
        // Great Grand Parent
        const greatGrandParentItem = listData[i];
        if ((greatGrandParentItem as unknown as ChangeListDataItemType)?.isSelected ?? false) {
            str.push(`All ${greatGrandParentItem.title} selected`);
        } else {
            str = str.filter(x => x !== `All ${greatGrandParentItem.title} selected`)
            for (let j = 0; j < listData[i].data.length; j++) {
                // Grand Parent 
                const grandParentItem = listData[i].data[j];
                if ((grandParentItem as unknown as ChangeListDataItemType).isSelected ?? false) {
                    str.push(`All ${listData[i].data[j].title} selected`);
                } else {
                    str = str.filter(x => x !== `All ${listData[i].data[j].title} selected`)
                    for (let k = 0; k < listData[i].data[j].data.length; k++) {
                        // Parent
                        const parentItem = listData[i].data[j].data[k];
                        if ((parentItem as unknown as ChangeListDataItemType)?.isSelected ?? false) {
                            str.push(`All ${listData[i].data[j].data[k].title} selected`);
                        } else {
                            str = str.filter(x => x !== `All ${listData[i].data[j].data[k].title} selected`)
                            // Child Which is last 
                            for (let l = 0; l < listData[i].data[j].data[k].data.length; l++) {
                                const child = listData[i].data[j].data[k].data[l];
                                if ((child as unknown as ChangeListDataItemType)?.isSelected ?? false) {
                                    str.push(`${listData[i].data[j].data[k].title} ${listData[i].data[j].data[k].data[l].title} selected`);
                                } else {
                                    str = str.filter(x => x !== `${listData[i].data[j].data[k].title} ${listData[i].data[j].data[k].data[l].title} selected`)
                                }
                            }
                        }

                    }
                }
            }
        }
    }

    return str;
}