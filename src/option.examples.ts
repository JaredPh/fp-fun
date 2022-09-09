import { pipe } from "fp-ts/lib/function";

import * as O from "./option.exercise";

/***********************
 *  Example One: default text
 ***********************/

export interface Horse {
  name: string;
  color: "white" | "brown" | "black";
  legs: number;
}

export const describeHorse = (maybeHorse: Horse | undefined) =>
  pipe(
    maybeHorse,
    O.fromNullable,
    O.map(
      (horse) =>
        `${horse.name} is a ${horse.color} horse and has ${horse.legs} legs`
    ),
    O.getOrElse(() => "this horse doesn't exist")
  );

//  The above is basically the below but using fp-ts's pipe function
//
//  const describeHorse = (maybeHorse: Horse | undefined) => {
//    const a = O.fromNullable(maybeHorse);
//
//    const b = O.map(
//      (horse: Horse) =>
// `      ${horse.name} is a ${horse.color} horse and has ${horse.legs} legs`
//    )(a);
//
//    const c = O.getOrElse(() => "this horse doesn't exist")(b);
//
//    return c;
//  }

/***********************
 *  Example Two: Nested objects
 ***********************/

const squareNumbersInArray = (array: number[]) => array.map((n) => n * n);
const sumNumbersInArray = (array: number[]) =>
  array.reduce((sum, n) => sum + n, 0);

export const calculateSumOfSquares = (maybeArray: number[] | null) =>
  pipe(
    maybeArray,
    O.fromNullable,
    O.map(squareNumbersInArray),
    O.map(sumNumbersInArray),
    O.getOrElse(() => 0)
  );

/***********************
 *  Example Three: Nested objects
 ***********************/

export interface Person {
  company?: {
    address?: {
      street?: {
        number?: number;
      };
    };
  };
}

export const getHouseNumber = (person: Person) =>
  pipe(
    person.company,
    O.fromNullable,
    O.chainNullable((company) => company.address),
    O.chainNullable((address) => address.street),
    O.chainNullable((street) => street.number),
    O.getOrNull
  );
