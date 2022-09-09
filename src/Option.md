#Option

## Overview

```typescript
type Option<A> = None | Some<A>;
```

`Option<A>` is a container for an optional value of type `A`. If the value of type `A` is present, the `Option<A>` is an instance of `Some<A>`, containing the present value of type `A`. If the value is absent, the `Option<A>` is an instance of None.

An option could be looked at as a collection or foldable structure with either one or zero elements. Another way to look at Option is: it represents the effect of a possibly failing computation.

~src [gcanti.github.io](https://gcanti.github.io/fp-ts/modules/Option.ts.html#option-overview)

## Option monad

### None

```typescript
type None = { type: "None" };
```

### Some

```typescript
type Some<A> = { type: "Some"; value: A };
```

## Example

### Getting the head of an array

```typescript
import * as O from Option;

const head = <A>(arr: A[]): O.Option<A> => O.fromNullable(arr[0]);

const myEmptyArray: string[] = [];
const myFruitfulArray: string[] = ['Apple', 'Banana', 'Orange'];

console.log(head(myEmptyArray));

/*
 * {
 *   type: 'None',
 * }
 */

console.log(head(myFruitfulArray));

/*
 * {
 *   type: 'Some',
 *   value: 'Apple',
 * }
 */

```

### Other examples

- Finding a value in an array that might exist
- Getting a key in record/object that might be undefined (no more Elvis operators `x?.y`)

## Why use this monad?

See [danieljharvey/functional-programming-is-boring](https://github.com/danieljharvey/functional-programming-is-boring/blob/master/slides/lesson1-option.md).

## Option functions

fp-ts has a lot of methods available for transforming Options ([see here](https://gcanti.github.io/fp-ts/modules/Option.ts.html#option-overview)).
