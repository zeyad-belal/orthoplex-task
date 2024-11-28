import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  test('renders error message when provided', () => {
    const message = 'Test error message';
    render(<ErrorMessage message={message} onClose={() => {}} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  test('does not render when no message is provided', () => {
    const { container } = render(<ErrorMessage message="" onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  test('calls onClose when error message is clicked', () => {
    const onClose = jest.fn();
    const message = 'Test error message';
    render(<ErrorMessage message={message} onClose={onClose} />);
    
    const errorMessage = screen.getByRole('alert');
    fireEvent.click(errorMessage);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('has the correct styling classes', () => {
    const message = 'Test error message';
    render(<ErrorMessage message={message} onClose={() => {}} />);
    
    const errorDiv = screen.getByRole('alert');
    expect(errorDiv).toHaveClass('bg-red-50');
    expect(errorDiv).toHaveClass('border');
    expect(errorDiv).toHaveClass('border-red-400');
    expect(errorDiv).toHaveClass('text-red-700');
  });

  test('renders XCircle icon', () => {
    const message = 'Test error message';
    render(<ErrorMessage message={message} onClose={() => {}} />);
    
    const icon = screen.getByTestId('error-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-red-500');
  });
});
