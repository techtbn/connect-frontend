const fundingTypes = [
  {
    label: 'Loan',
    value: 'loan',
    color: '#881337'
  }, {
    label: 'Equity',
    value: 'equity',
    color: '#fca5a5'
  }, {
    label: 'Grant',
    value: 'grant',
    color: '#f97316'
  }, {
    label: 'Others',
    value: 'others',
    color: '#fef08a'
  }
];

const fundingTypesColorsMap = Object.fromEntries(fundingTypes.map((se) => [se.value, se.color]));

export { fundingTypes, fundingTypesColorsMap };
