import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from '~/components/atom/Text';
import { TreeDataTypes, TreeView } from '~/components/organisms/TreeView';
import { useTheme } from '~/hooks/useTheme';
import SelectedVariant from './components/SelectedVariant';
import { styles } from './styles';
import { getSelectedProducts } from './utils';


interface BrowseProductsProps {
    data: TreeDataTypes[]
}


export const BrowseProductsScreen: React.FC<BrowseProductsProps> = ({ data }) => {
    const theme = useTheme();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    return (
        <View style={{ ...styles.container }}>
            <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
                <Text variant="headline4" color="black" marginHorizontal='l'>
                    Browse Products
                </Text>
            </View>
            <View style={{ ...styles.listContainer, margin: theme.spacing.s }} >
                <TreeView
                    data={data}
                    onCheckBoxPress={(listData) => {
                        const selectedProducts = getSelectedProducts(listData)
                        setSelectedItems(selectedProducts)
                    }}
                />
            </View>
            <View style={{ flex: 2 }} >
                <SelectedVariant selectedItems={selectedItems} />
            </View>
        </View>

    )
};

