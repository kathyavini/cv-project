import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import initialData from '../initialData';

// Should I mock local storage for the purpose of the snapshot?
test('Initial page load snapshot', () => {
  const { container, getByText } = render(<App />, { legacyRoot: true });
  expect(container).toMatchSnapshot();
});

// Some dummy tests below to remind myself how userEvent works
test('Hover displays edit button', () => {
  render(<App />);

  const input = screen.getByRole('textbox');
  const submitBtn = screen.getByRole('button');

  userEvent.type(input, 'Test task');
  userEvent.click(submitBtn);

  const firstItem = screen.getByRole('listitem');
  expect(firstItem.textContent).toMatch(/test task/i);
});

// Test the reset buttons
test.skip('Clicking on delete icon deletes task', () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  const submitBtn = screen.getByRole('button');

  userEvent.type(input, 'First task');
  userEvent.click(submitBtn);
  userEvent.type(input, 'Second task');
  userEvent.click(submitBtn);
  userEvent.type(input, 'Third task');
  userEvent.click(submitBtn);

  const deleteIcons = screen.getAllByLabelText('delete');

  userEvent.click(deleteIcons[1]);

  const secondTask = screen.queryByText('Second task');

  expect(secondTask).not.toBeInTheDocument();
});
