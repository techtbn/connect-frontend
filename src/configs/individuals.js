const individualTypes = [
  {
    label: 'Starter',
    value: 'starter',
    color: '#bae7ff',
    extra: 'I want to learn more but not sure about my commitment at this point'
  }, {
    label: 'Explorer',
    value: 'explorer',
    color: '#85a5ff',
    extra: 'I would like to have some hands-on experience, at least a few hours in a quarter'
  }, {
    label: 'Adventurer',
    value: 'adventurer',
    color: '#722ed1',
    extra: 'I can help with ad-hoc projects, at least a few hours a month'
  }, {
    label: 'Guide',
    value: 'guide',
    color: '#780650',
    extra: 'This is important to me and I am ready to dive in and commit at least a few hours a weeks'
  }
];

const individualTypesColorsMap = Object.fromEntries(
  individualTypes.map((it) => [it.value, it.color])
);

export { individualTypes, individualTypesColorsMap };
