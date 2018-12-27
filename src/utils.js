const snakeCaseToCapitalized = text => text
  .split('_')
  .map(word => word[0].toUpperCase() + word.substr(1))
  .join(' ');

export default { snakeCaseToCapitalized };
