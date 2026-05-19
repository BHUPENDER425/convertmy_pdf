import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header logo', () => {
  render(<App />);
  // the header now uses an image with alt="Logo"
  const logo = screen.getByAltText(/logo/i);
  expect(logo).toBeInTheDocument();
});
