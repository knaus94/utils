class xP<T> extends Promise<T> {
   constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
      super(executor);
   }

   static from<T>(promise: Promise<T>): xP<T> {
      return Object.setPrototypeOf(promise, xP.prototype) as xP<T>;
   }

   tap(onValue: (value: T) => void, onError?: (error: any) => void): xP<T> {
      return xP.from(
         this.then(
            (value) => {
               Promise.resolve().then(() => onValue(value));
               return value;
            },
            (error) => {
               if (onError) {
                  Promise.resolve().then(() => onError(error));
               }
               throw error;
            },
         ),
      ) as xP<T>;
   }

   then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
   ): xP<TResult1 | TResult2> {
      return promiseOf(
         super.then((value) => {
            const result = onfulfilled ? onfulfilled(value) : value;
            return result instanceof Promise ? result : Promise.resolve(result);
         }, onrejected),
      ) as xP<TResult1 | TResult2>;
   }

   catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): xP<T | TResult> {
      return promiseOf(super.catch(onrejected)) as xP<T | TResult>;
   }

   catchByPrismaCode<TError extends Error>(codes: string | string[], handler: (error: TError) => void): xP<T> {
      return promiseOf(
         this.catch((error) => {
            if ('code' in error && error.name === 'PrismaClientKnownRequestError') {
               const errorCodes = Array.isArray(codes) ? codes : [codes];
               if (errorCodes.includes(error.code)) {
                  handler(error as any);
                  return undefined as any;
               }
            }
            throw error;
         }),
      ) as xP<T>;
   }
}

export function promiseOf<T = void>(inputPromise?: Promise<T>): xP<T> {
   if (inputPromise) {
      return xP.from(inputPromise);
   } else {
      return xP.from(new Promise<T>((resolve) => resolve(undefined as T)));
   }
}
