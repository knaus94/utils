export const roundNumber = (value: number, digits = 4) => {
   const factor = Math.pow(10, digits);
   return Math.trunc(value * factor) / factor;
};
