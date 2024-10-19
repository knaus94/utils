const r = (value: number, digits = 2) => {
   const factor = Math.pow(10, digits);
   return Math.trunc(value * factor) / factor;
};

// Объявление перегрузок
export function roundNumber(value: number, money: boolean): number;
export function roundNumber(value: number, decimals?: number): number;

// Реализация функции
export function roundNumber(value: number, arg?: boolean | number): number {
   if (typeof arg === 'boolean') {
      // Если второй аргумент булевый, используем логику для money
      const decimals = value < 1 && arg ? 4 : 2;
      return r(value, decimals);
   } else {
      const decimals = arg ?? 2;
      return r(value, decimals);
   }
}
