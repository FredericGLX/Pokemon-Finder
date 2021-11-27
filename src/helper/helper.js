export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const shortenStatName = (stat) => {
  if (stat === 'special-attack') stat = 'Sp. Atk';
  if (stat === 'special-defense') stat = 'Sp. Def';
  return stat;
};

export const changeStatBarColor = (stat) => {
  let barColor = '#ffe400';
  if (stat < 50) barColor = '#CF2020';
  if (stat > 50 && stat < 80) barColor = '#FF7E00';
  if (stat >= 80 && stat <= 90) barColor = '#EDC81B';
  if (stat >= 100 && stat < 120) barColor = '#FFDF00';
  if (stat >= 120) barColor = '#34BF08';
  return barColor;
};
