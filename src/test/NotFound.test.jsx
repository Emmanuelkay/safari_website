import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../pages/NotFound';

describe('NotFound page', () => {
  it('renders 404 heading', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('shows trail not found message', () => {
    render(<NotFound />);
    expect(screen.getByText('Trail Not Found')).toBeInTheDocument();
  });

  it('has a back-to-home link', () => {
    render(<NotFound />);
    const link = screen.getByText('Back to Home');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });

  it('has a contact link', () => {
    render(<NotFound />);
    const link = screen.getByText('Contact Us');
    expect(link.closest('a')).toHaveAttribute('href', 'https://wa.me/254718592358');
  });
});
