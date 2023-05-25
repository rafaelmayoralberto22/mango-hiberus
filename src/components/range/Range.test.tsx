import { render, screen } from '@testing-library/react';
import Range from './Range';
import '@testing-library/jest-dom';
 
describe('Range', () => {
  it('renders a heading', () => {
    render(<Range />);
 
    const heading = screen.getByRole('heading', {
      name: "Range",
    });
 
    expect(heading).toBeInTheDocument();
  });
});