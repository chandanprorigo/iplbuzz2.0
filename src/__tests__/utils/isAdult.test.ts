import { isAdult } from "../../components/jestFundamentals/utils/isAdult";

test('returns true if age >= 18', () => {
  expect(isAdult({ name: 'Chandan', age: 20 })).toBe(true);
});

test('returns false if age < 18', () => {
  expect(isAdult({ name: 'Raj', age: 16 })).toBe(false);
});
