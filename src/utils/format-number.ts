export function formatNumber(value: number, symbol = ','): string {
   const [integerPart, decimalPart] = value.toString().split('.');
   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, symbol);

   return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}
