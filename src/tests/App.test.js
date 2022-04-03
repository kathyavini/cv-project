import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import initialData from '../initialData';

// With local storage I'm not sure how useful snapshot could be
test('Initial page load snapshot', () => {
  const { container } = render(<App />, { legacyRoot: true });
  expect(container).toMatchSnapshot();
});

// Some dummy tests below to remind myself how userEvent works
test.skip('Clicking button adds input box text to list item', () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  const submitBtn = screen.getByRole('button');

  userEvent.type(input, 'Test task');
  userEvent.click(submitBtn);

  const firstItem = screen.getByRole('listitem');
  expect(firstItem.textContent).toMatch(/test task/i);
});

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
