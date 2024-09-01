export type RemoveNullFromKey<T, K extends keyof T> = Omit<T, K> & {
   [P in K]: NonNullable<T[P]>;
};
