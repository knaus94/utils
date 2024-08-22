export function tPromise<T>(promise: Promise<T>, ms: number): Promise<T> {
   const timeout = new Promise<T>((_, reject) => {
      setTimeout(() => {
         reject('timeout');
      }, ms);
   });

   return Promise.race([promise, timeout]);
}
