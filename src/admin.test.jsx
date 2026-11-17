import React from 'react';
import { fireEvent, render, screen, within, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AdminPage } from './pages/AdminPage';
import { adminStorageKey, readDemo } from './data/adminDemo';

beforeEach(() => localStorage.clear());

test('admin can add a guest booking and retain it across reloads', () => {
  render(<AdminPage navigate={jest.fn()} />);
  fireEvent.click(screen.getByRole('button', { name: 'Add booking', exact: true }));
  const dialog = within(screen.getByRole('dialog'));
  fireEvent.change(dialog.getByLabelText('Guest full name'), { target: { value: 'Test Guest' } });
  fireEvent.change(dialog.getByLabelText('Email address'), { target: { value: 'guest@example.com' } });
  fireEvent.click(dialog.getByRole('button', { name: 'Add booking' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Test Guest', exact: true })).toBeInTheDocument();
  cleanup();
  render(<AdminPage navigate={jest.fn()} />);
  expect(screen.getByRole('button', { name: 'Test Guest', exact: true })).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Search bookings'), { target: { value: 'Test Guest' } });
  fireEvent.click(screen.getByRole('button', { name: 'Check in', exact: true }));
  expect(screen.getByRole('button', { name: /Checked in/ })).toBeInTheDocument();
});

test('admin can create an event and cannot reduce capacity below reserved places', () => {
  render(<AdminPage navigate={jest.fn()} />);
  fireEvent.click(screen.getByRole('tab', { name: 'Events' }));
  fireEvent.click(screen.getByRole('button', { name: 'Create event' }));
  let dialog = within(screen.getByRole('dialog'));
  for (const [label, value] of [['Event name', 'New Year Flow'], ['Date', '2027-01-16'], ['Venue', 'Sandton'], ['Price per person (ZAR)', '300']]) {
    fireEvent.change(dialog.getByLabelText(label), { target: { value } });
  }
  fireEvent.click(dialog.getByRole('button', { name: 'Create event' }));
  expect(screen.getByRole('heading', { name: 'New Year Flow' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Edit Summer in Flow' }));
  dialog = within(screen.getByRole('dialog'));
  fireEvent.change(dialog.getByLabelText('Capacity'), { target: { value: '1' } });
  fireEvent.click(dialog.getByRole('button', { name: 'Save changes' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Capacity cannot be lower');
});

test('corrupt browser storage restores a usable fictional demo', () => {
  localStorage.setItem(adminStorageKey, 'broken json');
  expect(readDemo().bookings).toHaveLength(18);
});
