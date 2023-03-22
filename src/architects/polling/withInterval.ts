/**
 * How it works
 * [1]: We use setInterval() to create an eternal loop that periodically calls the API, checks its results, etc. When polling is canceled, intervalId will be null.
 * [2]: We call the API
 * [3]: When results arrive, if polling wasn’t canceled, we check the results, and if the test passes, we stop polling and do something special
 * [4]: On any API error, we stop polling and throw an exception
 * [5]: To stop polling (if it was running) we use clearInterval() and set intervalId to null, as we mentioned above regarding item (1)
 * [6]: As with the loop-based polling solution, we return the function that can be used to stop polling.
 * */

type TestFn = (...args: any) => boolean;
type Fn = (...args: any) => void;

export function pollingWithInterval<T>(callApiFn: () => Promise<T>, testFn: TestFn, doFn: Fn, time: number) {
  // [1]
  let intervalId: NodeJS.Timer | null = setInterval(() => {
    callApiFn() // [2]
      .then(data => {
        // [3]
        if (intervalId && testFn(data)) {
          stopPolling();
          doFn(data);
        }
      })
      // [4]
      .catch(() => {
        stopPolling();
        throw new Error('Polling canceled due to API error');
      });
  }, time);

  // [5]
  function stopPolling() {
    if (intervalId) {
      console.log(new Date(), 'Stop polling...');
      clearInterval(intervalId);
      intervalId = null;
    } else {
      console.log(new Date(), 'Polling was already stopped...');
    }
  }

  return stopPolling; // [6]
}

// console.log(new Date(), 'Starting polling');
// const stopPolling = pollingWithInterval(callFakeApi, testCondition, doSomething, 1000);
// await timeout(6300);
// console.log(new Date(), 'Canceling polling');
// stopPolling();
