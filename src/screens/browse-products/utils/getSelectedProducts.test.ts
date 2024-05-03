import { getSelectedProducts } from './getSelectedProducts';

describe('getSelectedProducts', () => {
    it('should return all selected products when all are selected', () => {
        const mockData = [{
            title: 'Phones',
            isSelected: true,
            data: [{
                title: 'Apple',
                isSelected: true,
                data: [{
                    title: 'iPhone 8',
                    isSelected: true,
                    data: [{
                        title: '128GB',
                        isSelected: true
                    }]
                }]
            }]
        }];

        const expected = ['All Phones selected'];
        const result = getSelectedProducts(mockData);
        expect(result).toEqual(expected);
    });

    it('should return an empty array when no items are selected', () => {
        const mockData = [{
            title: 'Phones',
            isSelected: false,
            data: [{
                title: 'Apple',
                isSelected: false,
                data: [{
                    title: 'iPhone 8',
                    isSelected: false,
                    data: [{
                        title: '128GB',
                        isSelected: false
                    }]
                }]
            }]
        }];

        const expected:string[] = [];
        const result = getSelectedProducts(mockData);
        expect(result).toEqual(expected);
    });

    it('should return only selected products with mixed selection states', () => {
        const mockData = [{
            title: 'Phones',
            isSelected: false,
            data: [{
                title: 'Apple',
                isSelected: false,
                data: [{
                    title: 'iPhone 8',
                    isSelected: true,
                    data: [{
                        title: '128GB',
                        isSelected: true
                    },{
                        title: '256GB',
                        isSelected: true
                    }]
                }]
            }]
        }];

        const expected = ['All iPhone 8 selected'];
        const result = getSelectedProducts(mockData);
        expect(result).toEqual(expected);
    });

    it('should correctly handle nested structures with only leaf nodes selected', () => {
        const mockData = [{
            title: 'Phones',
            isSelected: false,
            data: [{
                title: 'Apple',
                isSelected: false,
                data: [{
                    title: 'iPhone 8',
                    isSelected: false,
                    data: [{
                        title: '128GB',
                        isSelected: true
                    }]
                }]
            }]
        }];

        const expected = ['iPhone 8 128GB selected'];
        const result = getSelectedProducts(mockData);
        expect(result).toEqual(expected);
    });
});
