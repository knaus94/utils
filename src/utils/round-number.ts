export const roundNumber = (value: number, digits = 2) => {
   const factor = Math.pow(10, digits);
   return Math.trunc(value * factor) / factor;
};
