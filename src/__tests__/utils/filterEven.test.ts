import { filterEven } from "../../components/jestFundamentals/utils/filterEven";

test('filters out odd numbers', () => {
  expect(filterEven([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
});
