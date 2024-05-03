import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from '~/components/atom/Text';
import { TreeDataTypes } from '~/components/organisms/TreeView';

interface SelectedVariantProps {
    selectedItems: string[];
}

const SelectedVariant: React.FC<SelectedVariantProps> = ({ selectedItems }) => {
    return (
        <>
            <View style={styles.container}>
                <Text variant="headline4" color="black" marginHorizontal='l' >Selected Variants</Text>
            </View>
            <ScrollView horizontal={true} style={styles.selectedItemsContainer}>
                {selectedItems.map((item: any, index: number) => (
                    <View key={index} style={styles.itemContainer}>
                        <Text variant='body4' color="black">{item}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={{ flex: 0.9 }} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    selectedItemsContainer: {
        marginHorizontal: 20,
        padding: 0,
        flex: 0.1,
    },
    itemContainer: {
        marginLeft: 10,
        padding: 4,
        borderRadius: 2,
        backgroundColor: '#C4C4C4',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemText: {
        fontSize: 16,
        color: "#000",
    },
    // Your other styles...
});

export default SelectedVariant;

