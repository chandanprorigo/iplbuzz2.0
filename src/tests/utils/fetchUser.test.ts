import { fetchUser } from "../../components/jestFundamentals/utils/fetchUser";

test('fetches user by id', async () => {
  const user = await fetchUser(1);
  expect(user).toEqual({ id: 1, name: 'Chandan' });
});
