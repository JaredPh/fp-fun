import {
  calculateSumOfSquares,
  describeHorse,
  getHouseNumber,
  Horse,
  Person,
} from "./option.examples";

describe("Option (examples)", () => {
  describe("horses", () => {
    test("should describe a horse that doesn't exist", () => {
      const maybeHorse: undefined = undefined;

      const actual = describeHorse(maybeHorse);

      expect(actual).toBe("this horse doesn't exist");
    });

    test("should describe a horse that does exist", () => {
      const maybeHorse: Horse = {
        name: "Hoof Hearted",
        color: "white",
        legs: 4,
      };

      const actual = describeHorse(maybeHorse);

      expect(actual).toBe("Hoof Hearted is a white horse and has 4 legs");
    });
  });

  describe("sum of squares", () => {
    test("should handle null", () => {
      const maybeArray = null;

      const actual = calculateSumOfSquares(maybeArray);

      expect(actual).toBe(0);
    });

    test("should calculate the sum of squares", () => {
      const maybeArray: number[] = [1, 2, 3, 4, 5];

      const actual = calculateSumOfSquares(maybeArray);

      expect(actual).toBe(/*1 + 4 + 9 + 16 + 25*/ 55);
    });
  });

  describe("nested object that could be undefined", () => {
    test("should return the street number", () => {
      const person: Person = {
        company: {
          address: {
            street: { number: 91210 },
          },
        },
      };

      const actual = getHouseNumber(person);

      expect(actual).toBe(91210);
    });

    test.each`
      label                  | person
      ${"no address"}        | ${{ company: {} }}
      ${"no street"}         | ${{ company: { address: {} } }}
      ${"no street number "} | ${{ company: { address: { street: {} } } }}
    `("should return null if there is $label", ({ person }) => {
      const actual = getHouseNumber(person);

      expect(actual).toBe(null);
    });
  });
});
