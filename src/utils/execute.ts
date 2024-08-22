export const execute = <T>(fn: () => T): T => fn();

export const executeAsync = async <T>(fn: () => Promise<T>): Promise<T> => {
   return fn();
};
