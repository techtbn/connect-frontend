const seTypes = [
  {
    label: 'Charity / Non-Profit',
    value: 'charity',
    color: '#34d399'
  }, {
    label: 'Impact 1st Revenue Generating SE',
    value: 'rev-gen',
    color: '#0f766e'
  }, {
    label: 'Fin 1st Socially Driven',
    value: 'soc-drive',
    color: '#06b6d4'
  }
];

const seColorsMap = Object.fromEntries(seTypes.map((se) => [se.value, se.color]));

export { seColorsMap, seTypes };
