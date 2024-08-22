export function tripleFunction<T, U>(promise: Promise<T>) {
   function withCondition(condition: (result: T) => boolean) {
      function withSuccessCallback(successCallback: (result: T) => U) {
         return promise.then((result) => {
            if (condition(result)) {
               return successCallback(result);
            } else {
               return undefined;
            }
         });
      }
      return withSuccessCallback;
   }
   return withCondition;
}
