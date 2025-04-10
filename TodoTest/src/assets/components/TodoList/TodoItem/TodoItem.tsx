import { Dispatch, SetStateAction } from 'react';
import { Todo } from '../types';

type TodoItemProps = {
  todo: Todo;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export function TodoItem({ todo, setTodos }: TodoItemProps) {
  const toggleTodo = () => {
    setTodos(prev => prev.map(t => 
      t.id === todo.id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTodo = () => {
    setTodos(prev => prev.filter(t => t.id !== todo.id));
  };

  return (
    <div className={`flex items-center p-3 rounded-lg group transition-colors
      ${todo.completed ? 'opacity-70' : ''}
      bg-white dark:bg-gray-800 
      hover:bg-gray-100 dark:hover:bg-gray-700 
      shadow-sm dark:shadow-none
      border border-gray-200 dark:border-gray-700`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleTodo}
        className="h-5 w-5 text-purple-500 rounded 
                 focus:ring-purple-400 dark:focus:ring-purple-600
                 border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-700"
      />
      <span 
        className={`ml-3 flex-1 transition-colors
          ${todo.completed 
            ? 'line-through text-gray-500 dark:text-gray-400' 
            : 'text-gray-800 dark:text-gray-100'}`}
      >
        {todo.text}
      </span>
      <button
        onClick={deleteTodo}
        className="ml-2 text-red-600 dark:text-red-400 
                 opacity-0 group-hover:opacity-100 
                 transition-opacity duration-200"
      >
        ✕
      </button>
    </div>
  );
}