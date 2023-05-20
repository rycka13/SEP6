export function randomNumberFromInterval(min, max, decimals) { // min and max included
  return Number((Math.random() * (max - min + 1) + min).toFixed(decimals));
}
