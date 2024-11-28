import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../Navbar';

// Mock useAuth hook
jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn()
}));

// Mock useLocation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/dashboard'
  })
}));

describe('Navbar', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    useAuth.mockImplementation(() => ({
      logout: mockLogout
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders navigation links on desktop', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Desktop menu should be visible
    const desktopNav = screen.getByRole('navigation').querySelector('.hidden.md\\:flex');
    expect(desktopNav).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('applies active styles to current route', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveClass('text-primary-600');
    expect(homeLink).toHaveClass('bg-primary-50');
  });

  test('toggles mobile menu when menu button is clicked', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Initially mobile menu should not exist in the DOM
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();

    // Click menu button
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);

    // Mobile menu should now exist in the DOM
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();

    // Click close button
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Mobile menu should be removed from the DOM
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });

  test('calls logout when desktop logout button is clicked', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const logoutButtons = screen.getAllByText('Logout');
    fireEvent.click(logoutButtons[0]); // Desktop logout button
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  test('calls logout when mobile logout button is clicked', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);

    // Click mobile logout button
    const mobileLogoutButton = screen.getAllByText('Logout')[1];
    fireEvent.click(mobileLogoutButton);
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
