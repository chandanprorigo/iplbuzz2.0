import { render, screen } from '@testing-library/react';
import Hello from '../components/jestFundamentals/Hello';

test('renders hello message', () => {
  render(<Hello name="Chandan" />);
  expect(screen.getByText(/chandan/i)).toHaveTextContent('Hello, Chandan!');
});
