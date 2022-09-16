const seTypes = [
  {
    name: 'Impact Only',
    color: '#5cdbd3',
    children: [
      {
        label: 'Grants',
        value: 'impact-grants'
      }, {
        label: 'Grants & Trading Revenues',
        value: 'impact-grants-revenues'
      }
    ]
  }, {
    name: 'Impact First Revenue Generating',
    color: '#1890ff',
    children: [
      {
        label: 'Sustainable',
        value: 'rev-gen-sustainable'
      }, {
        label: 'Profitable with Surplus Reinvested',
        value: 'rev-gen-surplus'
      }, {
        label: 'Able to Distribute Profits',
        value: 'rev-gen-distribute-profits'
      }
    ]
  }, {
    name: 'Finance First Socially Driven',
    color: '#061178',
    children: [
      {
        label: 'Impact Initiatives',
        value: 'fin-first-initiatives'
      }, {
        label: 'Impact Embedded in Agenda',
        value: 'fin-first-agenda'
      }
    ]
  }
];

const seColorsMap = {
  'impact-grants': '#5cdbd3',
  'impact-grants-revenues': '#5cdbd3',
  'rev-gen-sustainable': '#1890ff',
  'rev-gen-surplus': '#1890ff',
  'fin-first-initiatives': '#061178',
  'fin-first-agenda': '#061178'
};

export { seColorsMap, seTypes };
