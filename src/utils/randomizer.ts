export const randomNumber = () => Math.random();

/**
 * Use odd-even number to determine success.
 * Even numbers will succeed, while odd
 * numbers won't.
 */
export const oddEvenRandomizer = (randomNumber: number) => {
  let newNumber = Math.floor(randomNumber * 1000);
  return newNumber % 2 === 0 ? true : false;
}

/**
 * Use value to determine success. Numbers
 * [0.0-0.5) will succeed, while numbers
 * [0.5-1.0] won't.
 */
export const halfRandomizer = (randomNumber: number) => {
  return randomNumber < 0.5 ? true : false;
}