import { render, screen, fireEvent } from '@testing-library/react';
import {TodoList} from '../TodoList/TodoList';

describe('TodoList', () => {
  test('adds new todo', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add new todo');
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('toggles todo completion', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add new todo');
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});