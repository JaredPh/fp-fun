/**
 * ▶ Set up --------------------------------------------
 *
 * Here are some types and functions to start us off.
 *
 * Types: both have a type string which we use as the discriminator
 *
 * - None - How we show a null or undefined value
 * - Some<A> - How we store a value
 *
 * Functions:
 *
 * - none() - return a None version of the Option monad
 * - some(value: A) - take a value and return a Some version of an Option monad
 *
 * - isNone(option: Option A) - returns true if the option has type 'None' and acts as a type guard
 * - isSone(option: Option A) - returns true if the option has type 'Some' and acts as a type guard
 *
 * We will use these in other functions to discriminate between the two 'types' of our Option monad.
 *
 **/

type None = { type: "None" };
type Some<A> = { type: "Some"; value: A };

export type Option<A> = None | Some<A>;

// none :: () -> Option never
export const none = (): Option<never> => ({ type: "None" });

// some :: A -> Option A
export const some = <A>(a: A): Option<A> => ({
  type: "Some",
  value: a,
});

// isNone :: Option A -> Boolean
export const isNone = <A>(option: Option<A>): option is None =>
  option.type === "None";

// isSome :: Option A -> Boolean
export const isSome = <A>(option: Option<A>): option is Some<A> =>
  option.type === "Some";

/**
 * ▶️ Step 1 --------------------------------------------
 *
 * We already have none() and some() functions to create instances of
 * our Option. But we should have a way to create an option from a
 * value that may be null or undefined.
 *
 * We should complete the `fromNullable` function below, so that we return
 * an option with the value as a 'some' or if null/undefined a 'none'.
 *
 * There are unit tests for this step in the option.spec.ts file, that we
 * should aim to pass.
 **/

// fromNullable :: (A | undefined | null) -> Option A
export const fromNullable = <A>(value: A | null | undefined): Option<A> => {
  return (value === null || value === undefined) ? none(): some(value)
};

/**
 * ▶️ Step 2 --------------------------------------------
 *
 * We no have 3 ways to create an Option monad. none(), some() and fromNullable().
 *
 * We now want to have a way to change an Option monad back to a simple value. This
 * will normally be at the edge of the system or function, when we have finished
 * iterating over the monad an looking to return the value; such as an http response.
 *
 * We should complete the `getOrNull` or `getOrUndefined` functions below. Each function
 * will either return the value if it is a some (get), or return the nullable type (or)
 * in the function name.
 **/

// getOrNull :: Option A -> A | null
export const getOrNull = <A>(option: Option<A>): A | null => undefined as any;

// getOrUndefined :: Option A -> A | null
export const getOrUndefined = <A>(option: Option<A>): A | undefined =>
  undefined as any;

/**
 * ▶️ Step 3 --------------------------------------------
 *
 * We might want to always return a value from our option, so null and undefined
 * won't do . For instance we have 3 products available, but if none are selected
 * we display default 'no product selected' message.
 *
 * We should complete the `getOrElse` function below, so that if we have 'None' we
 * return a value of the same type as we would expect if we had a 'some'
 * an option with the value as a 'some' or if null/undefined a 'none'.
 *
 * eg. const product = (fruitName: string) =>
 *        ['apple', 'banana'].find(f => f === fruitName) || 'no product selected';
 **/

// getOrElse :: (() -> A) -> Option A -> A
export const getOrElse =
  <A>(onNoneFn: () => A) =>
  (option: Option<A>): A =>
    undefined as any;

/**
 * ▶️ Step 4 --------------------------------------------
 *
 * We can now create an option and return it to a plain value! But this doesn't give us
 * much benefits if we can't transform and operate over the some value.
 *
 * We want to be able to iterate over the 'some' value.
 *
 * We should complete the `map` function below, so that if we receive a 'Some' we pass it to
 * the function and return a new 'Some' with the result.
 *
 * The function given to the map function should always return a value.
 *
 * If the map function receives a 'None' we should return a 'None'
 *
 * eg. const name = (str: string) => str.toLowerCase()
 **/

// map :: (A -> B) -> Option A -> Option B
export const map =
  <A, B>(onSomeFn: (a: A) => B) =>
  (option: Option<A>): Option<B> =>
    undefined as any;

/**
 * ▶️ Step 5 --------------------------------------------
 *
 * We no have the map function to iterate over the some value, but the caveat is that
 * we can only pass in a function that will always return a value.
 *
 * We may want to provide a function that returns an Option. Such as getting the first
 * item in an array.
 *
 * eg. const head = (arr: T[]): Option<T> => fromNullable(arr[0]);
 *
 * We should complete the `chain` function below, so that if we receive a 'Some' we pass it to
 * the function and return a new Option with the result.
 *
 * If the map function receives a 'None' we should return a 'None'
 **/

// chain :: (A -> Option B) -> Option A -> Option B
export const chain =
  <A, B>(onSomeFn: (a: A) => Option<B>) =>
  (option: Option<A>): Option<B> =>
    undefined as any;

/**
 * ▶️ Step 6 --------------------------------------------
 *
 * Where needed we can combine functions so that we keep our code small
 *
 * An example that I like a lot is chainNullable which is the combination
 * of map and fromNullable.
 *
 * We can pass in a function that may return a nullable value, then create
 * a new option from the result.
 *
 * eg.
 *     const maybePerson: Option<{ middleName?: string | undefined}> = ....
 *     const middleName: Option<string> = chainNullable((person) => person.middleName)(myOption);
 *
 * We should complete the `chainNullable` function below, so that if we receive a 'Some' we pass it to
 * the function then use the result to create a new Option.
 *
 * If the map function receives a 'None' we should return a 'None'
 **/

// chainNullable :: (A -> B) -> Option A -> Option B
export const chainNullable =
  <A, B>(onSomeFn: (a: A) => B | null | undefined) =>
  (option: Option<A>): Option<B> =>
    undefined as any;

/**
 * ▶️ Finally --------------------------------------------
 *
 * Here are some functions in the option.examples file that should combine our
 * new Option functions together to create larger functions.
 *
 * There are also tests to accompany them; please remove the 'skip' to see
 * if they work!
 **/
