import { divide } from "../../components/jestFundamentals/utils/divide";

test('divides two numbers', () => {
  expect(divide(10, 2)).toBe(5);
});

test('throws error on division by zero', () => {
  expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
});