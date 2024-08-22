type Func = (...args: any[]) => any;

export function compose<T, U, V>(f: (x: T) => U, g: (y: V) => T): (x: V) => U;
export function compose<T, U, V, Y>(f: (x: T) => U, g: (y: Y) => T, h: (z: V) => Y): (x: V) => U;
export function compose<T, U, V, Y, Z>(f: (x: T) => U, g: (y: Y) => T, h: (z: Z) => Y, i: (a: V) => Z): (x: V) => U;
export function compose<T, U, V, Y, Z, A>(f: (x: T) => U, g: (y: Y) => T, h: (z: Z) => Y, i: (a: A) => Z, j: (b: V) => A): (x: V) => U;
export function compose<T, U, V, Y, Z, A, B>(
   f: (x: T) => U,
   g: (y: Y) => T,
   h: (z: Z) => Y,
   i: (a: A) => Z,
   j: (b: B) => A,
   k: (c: V) => B,
): (x: V) => U;

export function compose(...funcs: Func[]) {
   return (...args: any[]) => funcs.reduceRight((acc, func) => [func(...acc)], args)[0];
}
