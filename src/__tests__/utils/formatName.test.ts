import { formatName } from "../../components/jestFundamentals/utils/formatName";

test('formats first and last names with trim', () => {
  expect(formatName(' Chandan ', ' Kumar ')).toBe('Chandan Kumar');
});