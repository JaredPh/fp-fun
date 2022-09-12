import * as O from "./option.exercise";

describe("Option (functions)", () => {
  describe("▶️ Set up --------------------------------------------", () => {
    describe("O.none", () => {
      test("should create an Option using the none function", () => {
        const option = O.none();

        expect(option).toEqual({ type: "None" });
      });
    });

    describe("O.some", () => {
      it.each`
        label          | value                    | expectation
        ${"a boolean"} | ${true}                  | ${{ type: "Some", value: true }}
        ${"a string"}  | ${"hello"}               | ${{ type: "Some", value: "hello" }}
        ${"a number"}  | ${42}                    | ${{ type: "Some", value: 42 }}
        ${"an object"} | ${{ foo: "bar" }}        | ${{ type: "Some", value: { foo: "bar" } }}
        ${"an array"}  | ${{ foo: ["😃", "😡"] }} | ${{ type: "Some", value: { foo: ["😃", "😡"] } }}
        ${"undefined"} | ${undefined}             | ${{ type: "Some", value: undefined }}
        ${"null"}      | ${null}                  | ${{ type: "Some", value: null }}
      `(
        "should create an Option using the some function for $label",
        ({ value, expectation }) => {
          const option = O.some(value);

          expect(option).toEqual(expectation);
        }
      );
    });

    describe("O.isNone", () => {
      test("should return `true` if option has type `None`", () => {
        const option: O.Option<never> = { type: "None" };

        const actual = O.isNone(option);

        expect(actual).toBe(true);
      });

      test("should return `false` if option has type `Some`", () => {
        const option: O.Option<string> = {
          type: "Some",
          value: "🧀 Cheese!",
        };

        const actual = O.isNone(option);

        expect(actual).toBe(false);
      });
    });

    describe("O.isSome", () => {
      test("should return `true` if option has type `Some`", () => {
        const option: O.Option<string> = {
          type: "Some",
          value: "🧀 Cheese!",
        };

        const actual = O.isSome(option);

        expect(actual).toBe(true);
      });

      test("should return `false` if option has type `None`", () => {
        const option: O.Option<never> = {
          type: "None",
        };

        const actual = O.isSome(option);

        expect(actual).toBe(false);
      });
    });
  });

  describe("▶️ Step 1 --------------------------------------------", () => {
    describe("O.fromNullable", () => {
      test("should return a option with type `None` for undefined", () => {
        const value = undefined;

        const actual = O.fromNullable(undefined);

        expect(actual).toEqual({ type: "None" });
      });

      test("should return a option with type `None` for null", () => {
        const value = null;

        const actual = O.fromNullable(null);

        expect(actual).toEqual({ type: "None" });
      });

      test.each`
        label          | value                    | expectation
        ${"a boolean"} | ${true}                  | ${{ type: "Some", value: true }}
        ${"a string"}  | ${"hello"}               | ${{ type: "Some", value: "hello" }}
        ${"a number"}  | ${42}                    | ${{ type: "Some", value: 42 }}
        ${"an object"} | ${{ foo: "bar" }}        | ${{ type: "Some", value: { foo: "bar" } }}
        ${"an array"}  | ${{ foo: ["😃", "😡"] }} | ${{ type: "Some", value: { foo: ["😃", "😡"] } }}
      `(
        "should return a option with type `Some` for $label",
        ({ value, expectation }) => {
          const actual = O.fromNullable(value);

          expect(actual).toEqual(expectation);
        }
      );
    });
  });

  describe("▶️ Step 2 --------------------------------------------", () => {
    describe("O.getOrNull", () => {
      test("should return a value for a `Some`", () => {
        const option: O.Option<string> = { type: "Some", value: "foo" };

        const actual = O.getOrNull(option);

        expect(actual).toEqual("foo");
      });

      test("should return null for a `None`", () => {
        const option: O.Option<string> = { type: "None" };

        const actual = O.getOrNull(option);

        expect(actual).toBeNull();
      });
    });

    describe("O.getOrUndefined", () => {
      test("should return a value for a `Some`", () => {
        const option: O.Option<string> = { type: "Some", value: "foo" };

        const actual = O.getOrUndefined(option);

        expect(actual).toEqual("foo");
      });

      test("should return undefined for a `None`", () => {
        const option: O.Option<string> = { type: "None" };

        const actual = O.getOrUndefined(option);

        expect(actual).toBeUndefined();
      });
    });
  });

  describe("▶️ Step 3 --------------------------------------------", () => {
    describe("O.getOrElse", () => {
      test("should return the value in the option for a `Some`", () => {
        const option: O.Option<string> = {
          type: "Some",
          value: "3yr warranty",
        };

        const actual = O.getOrElse(() => "No warranty selected")(option);

        expect(actual).toBe("3yr warranty");
      });

      test("should return the value passed to getOrElse for a `None`", () => {
        const option: O.Option<string> = {
          type: "None",
        };

        const actual = O.getOrElse(() => "No warranty selected")(option);

        expect(actual).toBe("No warranty selected");
      });
    });
  });

  describe("▶️ Step 4 --------------------------------------------", () => {
    describe("O.map", () => {
      describe("where the input and output types are the same", () => {
        test("should return an option with a string changed to lowercase", () => {
          const option: O.Option<string> = {
            type: "Some",
            value: "HeLlO WorLD!",
          };

          const expectation: O.Option<string> = {
            type: "Some",
            value: "hello world!",
          };

          const stringToLowerCase = (str: string): string => str.toLowerCase();

          const actual = O.map(stringToLowerCase)(option);

          expect(actual).toEqual(expectation);
        });

        test("should return an option with an array of squares", () => {
          const option: O.Option<number[]> = {
            type: "Some",
            value: [1, 2, 3, 4, 5],
          };

          const expectation: O.Option<number[]> = {
            type: "Some",
            value: [1, 4, 9, 16, 25],
          };

          const squareNumbersInArray = (arr: number[]) =>
            arr.map((num) => num * num);

          const actual = O.map(squareNumbersInArray)(option);

          expect(actual).toEqual(expectation);
        });
      });

      describe("where the input and output types are different", () => {
        test("should return an option with a number from a string", () => {
          const option: O.Option<string> = {
            type: "Some",
            value: "1.618",
          };

          const expectation: O.Option<number> = {
            type: "Some",
            value: 1.618,
          };

          const actual = O.map(parseFloat)(option);

          expect(actual).toEqual(expectation);
        });

        test("should return an option with the sum of an array of numbers", () => {
          const option: O.Option<number[]> = {
            type: "Some",
            value: [1, 2, 3, 4, 5],
          };

          const expectation: O.Option<number> = {
            type: "Some",
            value: 15,
          };

          const sumNumbersInArray = (arr: number[]): number =>
            arr.reduce((sum, num) => sum + num, 0);

          const actual = O.map(sumNumbersInArray)(option);

          expect(actual).toEqual(expectation);
        });

        test("should return an option an object from an array", () => {
          const option: O.Option<[string, number][]> = {
            type: "Some",
            value: [
              ["goldenRatio", 1.618],
              ["e", 2.718],
              ["pi", 3.142],
            ],
          };

          const expectation: O.Option<Record<string, number>> = {
            type: "Some",
            value: { goldenRatio: 1.618, e: 2.718, pi: 3.142 },
          };

          const actual = O.map(Object.fromEntries)(option);

          expect(actual).toEqual(expectation);
        });
      });
    });
  });

  describe("▶️ Step 5 --------------------------------------------", () => {
    describe("O.chain", () => {
      const fruits = [
        ["apple", "$0.20"],
        ["banana", "$0.17"],
        ["pear", "$0.26"],
        ["cherry", "$0.07"],
      ];

      const findFruit = (searchTeam: string) =>
        O.fromNullable(fruits.find(([fruit]) => fruit === searchTeam));

      test("should return a `Some` of the fruit and price", () => {
        const option: O.Option<string> = {
          type: "Some",
          value: "pear",
        };

        const expectation: O.Option<[string, string]> = {
          type: "Some",
          value: ["pear", "$0.26"],
        };

        const actual = O.chain(findFruit)(option);

        expect(actual).toEqual(expectation);
      });

      test("should return a `None` if the fruit can't be found", () => {
        const option: O.Option<string> = {
          type: "Some",
          value: "carrot",
        };

        const expectation: O.Option<[string, string]> = {
          type: "None",
        };

        const actual = O.chain(findFruit)(option);

        expect(actual).toEqual(expectation);
      });
    });
  });

  describe("▶️ Step 6 --------------------------------------------", () => {
    describe("O.chainNullable", () => {
      const fruits = [
        ["apple", "$0.20"],
        ["banana", "$0.17"],
        ["pear", "$0.26"],
        ["cherry", "$0.07"],
      ];

      const findFruit = (searchTeam: string) =>
        fruits.find(([fruit]) => fruit === searchTeam);

      test("should return a `Some` of the fruit and price", () => {
        const option: O.Option<string> = {
          type: "Some",
          value: "pear",
        };

        const expectation: O.Option<[string, string]> = {
          type: "Some",
          value: ["pear", "$0.26"],
        };

        const actual = O.chainNullable(findFruit)(option);

        expect(actual).toEqual(expectation);
      });

      test("should return a `None` if the fruit can't be found", () => {
        const option: O.Option<string> = {
          type: "Some",
          value: "carrot",
        };

        const expectation: O.Option<[string, string]> = {
          type: "None",
        };

        const fruits = [
          ["apple", "$0.20"],
          ["banana", "$0.17"],
          ["pear", "$0.26"],
          ["cherry", "$0.07"],
        ];

        const findFruit = (searchTeam: string) =>
          fruits.find(([fruit]) => fruit === searchTeam);

        const actual = O.chainNullable(findFruit)(option);

        expect(actual).toEqual(expectation);
      });
    });
  });
});
