import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Dashboard from '../../pages/Dashboard';
import Cookies from 'js-cookie';

// Mock modules
jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/dashboard' })
}));

jest.mock('js-cookie');

describe('Dashboard', () => {
  const mockUser = {
    _id: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com'
  };

  beforeEach(() => {
    Cookies.get.mockReturnValue('mock-token');
    useAuth.mockImplementation(() => ({
      signedUser: mockUser,
      getAllUsers: jest.fn().mockResolvedValue([mockUser])
    }));
  });

  test('renders loading state initially', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
