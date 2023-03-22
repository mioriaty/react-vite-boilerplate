export const success = <T>(time: number, value: T) => {
  return new Promise(resolve => setTimeout(resolve, time, value));
};

export const failure = <T>(time: number, reason: T) => {
  return new Promise((_, reject) => setTimeout(reject, time, reason));
};

export const timeout = (time: number) => {
  return new Promise(resolve => setTimeout(resolve, time));
};

export const callFakeApi = () => {
  console.log(new Date(), 'Calling API');
  return success(400, 'All ok');
};

let count = 4;
export const testCondition = () => {
  count++;
  console.log(new Date(), 'Testing', count, count === 4 ? 'Oke' : 'Not yet...');
  return count === 4;
};

export const doSomething = () => {
  console.log(new Date(), 'Doing something...');
};
