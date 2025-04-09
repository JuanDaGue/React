import { Dispatch, SetStateAction } from 'react';

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
    <div className={`flex items-center p-3 bg-gray-800 rounded-lg group hover:bg-gray-700 transition-colors ${
      todo.completed ? 'opacity-70' : ''
    }`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleTodo}
        className="h-5 w-5 text-purple-500 rounded focus:ring-purple-400"
      />
      <span 
        className={`ml-3 flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-100'}`}
      >
        {todo.text}
      </span>
      <button
        onClick={deleteTodo}
        className="ml-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ✕
      </button>
    </div>
  );
}