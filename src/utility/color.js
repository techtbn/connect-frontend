/* eslint-disable */
const stringToColour = (str) => {
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (var i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    colour += (`00${value.toString(16)}`).substr(-2);
  }
  return colour;
};

export default stringToColour;
