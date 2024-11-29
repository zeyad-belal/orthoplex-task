import React from 'react';
import { render, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import axios from 'axios';
import Cookies from 'js-cookie';

// Test component
const TestComponent = () => {
  const { signedUser, login, signup, logout, getAllUsers } = useAuth();
  return (
    <div>
      <div data-testid="user-data">{signedUser ? JSON.stringify(signedUser) : 'no user'}</div>
      <button onClick={() => login('test@example.com', 'password123', false)}>Login</button>
      <button onClick={() => signup({ email: 'test@example.com', password: 'password123' })}>Signup</button>
      <button onClick={logout}>Logout</button>
      <button onClick={getAllUsers}>Get Users</button>
    </div>
  );
};

describe('AuthContext', () => {
  const mockUser = {
    _id: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@example.com'
  };

  beforeEach(() => {
    // Clear mocks
    jest.clearAllMocks();
    
    // Mock Cookies
    Cookies.get.mockImplementation(() => 'mock-token');
  });

  test('provides initial auth state', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(getByTestId('user-data')).toHaveTextContent('no user');
  });

  test('handles login failure', async () => {
    const mockError = { response: { data: { message: 'Invalid credentials' } } };
    axios.post.mockRejectedValueOnce(mockError);

    let component;
    await act(async () => {
      component = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    await act(async () => {
      component.getByText('Login').click();
    });

    expect(component.getByTestId('user-data')).toHaveTextContent('no user');
  });

  test('handles signup failure', async () => {
    const mockError = { response: { data: { message: 'Email already exists' } } };
    axios.post.mockRejectedValueOnce(mockError);

    let component;
    await act(async () => {
      component = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    await act(async () => {
      component.getByText('Signup').click();
    });

    expect(component.getByTestId('user-data')).toHaveTextContent('no user');
  });

  test('handles getAllUsers API call', async () => {
    const mockUsers = [mockUser];
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    let component;
    await act(async () => {
      component = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    await act(async () => {
      component.getByText('Get Users').click();
    });

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/users'),
      {
        headers: {
          'Authorization': 'mock-token',
          'Content-Type': 'application/json'
        }
      }
    );
  });
});
