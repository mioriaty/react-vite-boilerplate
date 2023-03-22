// Idea: We do a loop in which we wait some time, call the API, test the condition, and keep polling until the condition is satisfied or polling is canceled
/**
 * Explain
 * [1]: We define a polling variable; if it becomes false, we stop polling.
 * [2]: We set up a loop that will continue until polling is successful or aborted.
 * [3]: Why are we testing polling? Remember we are running async code; despite the while at (2), now polling could be canceled. If polling continues, we take some time before actually calling the API.
 * [4]: We call the API if we’re still working (see the previous point) after time has elapsed.
 * [5]: Again, if polling wasn’t canceled, we test the API results; if they were satisfactory, do stop polling and do whatever extra was expected.
 * [6]: If there was some error, we stop polling and throw an exception.
 * [7]: The doPolling function is actually a IIFE; we define the function —giving it a name just for clarity— and immediately call it.
 * [8]: The stopPolling function will allow us to cancel polling if it is running; setting polling to false stops things.
 * [9]: The result of a call to startPolling() is the function we need to cancel polling, should we want to.
 * */

import { timeout } from '@app/architects/polling/utils';

type TestFn = (...args: any) => boolean;
type Fn = (...args: any) => void;

export function startPollingWithLoop<T>(callApiFn: () => Promise<T>, testFn: TestFn, doFn: Fn, time: number) {
  let polling = true; // [1]

  (async function doPolling() {
    // [2]
    while (polling) {
      try {
        let result;
        // [3]
        if (polling) {
          await timeout(time);
        }
        // [4]
        if (polling) {
          result = await callApiFn();
        }
        // [5]
        if (polling && testFn(result)) {
          stopPolling();
          doFn(result);
        }
      } catch (error) {
        // [6]
        stopPolling();
        throw new Error('Polling cancelled due to API error');
      }
    }
  }); // [7]

  // [8]
  function stopPolling() {
    if (polling) {
      console.log(new Date(), 'Stop polling...');
      polling = false;
    } else {
      console.log(new Date(), 'Polling was already stopped...');
    }
  }

  return stopPolling; // [9]
}

// console.log(new Date(), 'Starting polling');
// const stopPolling = startPollingWithLoop(callFakeApi, testCondition, doSomething, 1000);
// await timeout(6300);
// console.log(new Date(), 'Canceling polling');
// stopPolling();
