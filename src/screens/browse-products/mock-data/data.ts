
export type MockDataType= {
  title:string;
  data: Array<{
    title:string
    data: Array<{
      title:string;
      data:Array<{
        title:string
      }>
    }>
  }>
}

export const BrowseProductsMockData:MockDataType[] = [
  {
    title: 'Phones',
    data: [
      {
        title: 'Apple',
        data: [
          {
            title: 'iPhone 8',
            data: [
              {
                title: '128GB',
              },
              {
                title: '256GB',
              }
            ]
          },
          {
            title: 'iPhone X',
            data: [
              {
                title: '256GB',

              },
              {
                title: '512GB',

              }
            ]
          }
        ]
      },
      {
        title: 'Samsung',
        data: [
          {
            title: 'Galaxy S10',
            data: [
              {
                title: '128GB',

              },
              {
                title: '256GB',

              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Computers',
    data: []
  },
  {
    title: 'Watches',
    data: []
  },
  {
    title: 'TVs',
    data: []
  }
];