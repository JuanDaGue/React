import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { TodoList } from '../TodoList';
import React from 'react';

describe('TodoList Component', () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('1. Renders empty todo list', () => {
    render(<TodoList />);
    expect(screen.getByText('Todo App')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add new todo')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  test('2. Adds new todo item', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText('Add new todo');
    const addButton = screen.getByText('Add');

    await user.type(input, 'Buy groceries');
    await user.click(addButton);

    expect(screen.getByText('Buy groceries')).toBeInTheDocument();

    // Updated assertion to allow extra fields like `createdAt`
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'todos',
      JSON.stringify([
        expect.objectContaining({
          id: expect.any(Number),
          text: 'Buy groceries',
          completed: false
        })
      ])
    );
  });

  test('3. Adds todo when pressing Enter', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText('Add new todo');
    await user.type(input, 'Walk the dog{enter}');

    expect(screen.getByText('Walk the dog')).toBeInTheDocument();
  });

  test('4. Toggles todo completion status', async () => {
    const user = userEvent.setup();
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify([{ id: 1, text: 'Test todo', completed: false }])
    );

    render(<TodoList />);
    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'todos',
      JSON.stringify([{ id: 1, text: 'Test todo', completed: true }])
    );
  });

  test('5. Deletes todo item', async () => {
    const user = userEvent.setup();
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify([{ id: 1, text: 'Delete me', completed: false }])
    );

    render(<TodoList />);
    const todoItem = screen.getByText('Delete me');

    await user.hover(todoItem);
    const deleteButton = screen.getByText('✕');
    await user.click(deleteButton);

    expect(todoItem).not.toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledWith('todos', '[]');
  });

  test('6. Displays completion count', () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify([
        { id: 1, text: 'Done', completed: true },
        { id: 2, text: 'Pending', completed: false }
      ])
    );

    render(<TodoList />);
    expect(screen.getByText('1 of 2 completed')).toBeInTheDocument();
  });
});
