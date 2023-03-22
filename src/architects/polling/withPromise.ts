type TestFn = (...args: any) => boolean;
type RejectFn = (reason?: any) => void;

/**
 * 1. We won’t pass the doFn() function because that will be called in the then() promise method. We’ll also have a polling variable (it will be true while polling goes on) and a rejectThis variable to store the reject function for the promise; see (3) and (4) below.
 * 2. The stopPolling() function will test if polling is running, and if so, it will stop it
 * 3. To stop polling, we reset polling to false, and we use the saved rejectThis function to force the promise to reject immediately
 * 4. We create a new promise; it starts by setting polling to true to show that polling is running
 * 5. To be able to force the promise to reject in stopPolling, we have to store the reject parameter in rejectThis; see (3) above
 * 6. The executePoll will do the polling and testing
 * 7. We call the API
 * 8. If polling wasn’t canceled, we test the API results, and if the test passes, we stop polling and resolve the promise
 * 9. If the test didn’t pass, we set a new poll call after a time delay
 * 10. on any error, we stop polling and reject the promise
 * 11. We start polling by setting executePoll to run for the first time after a time delay
 * 12. This function returns two values: the promise that does the polling, and the function to stop polling
 * */

export function pollingWithPromise<T>(callApiFn: () => Promise<T>, testFn: TestFn, time: number) {
  let polling = false; // [1]
  let rejectThis: RejectFn | null = null;

  const stopPolling = () => {
    // [2]
    if (polling) {
      console.log(new Date(), 'Polling was already stopped...');
    } else {
      console.log(new Date(), 'Stopping polling...'); // [3]
      polling = false;
      rejectThis?.(new Error('Polling cancelled'));
    }
  };

  const promise = new Promise((resolve, reject) => {
    polling = true; // [4]
    rejectThis = reject; // [5]

    const executePoll = async () => {
      // [6]
      try {
        const result = await callApiFn(); // [7]
        if (polling && testFn(result)) {
          // [8]
          polling = false;
          resolve(result);
        } else {
          // [9]
          setTimeout(executePoll, time);
        }
      } catch (error) {
        // [10]
        polling = false;
        reject(new Error('Polling cancelled due to API error'));
      }
    };

    setTimeout(executePoll, time); // [11]
  });

  return { promise, stopPolling };
}

// console.log(new Date(), 'Starting polling');
// const { promise, stopPolling } = startPolling(callFakeApi, testCondition, 1000);
// promise.then(doSomething).catch(() => {
//   /* do something on error */
// });
// await timeout(6300);
// console.log(new Date(), 'Canceling polling');
// stopPolling();
