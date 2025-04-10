import { useState, useEffect } from 'react';
import { Todo } from '../../../../../Types';
import { useTheme } from '../../../contexts/ThemeProvider'; // Adjust path as needed

export const TodoList = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: inputValue, 
        completed: false 
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className={`min-h-screen p-6 transition-colors duration-200 ${
      darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${
            darkMode ? 'text-purple-400' : 'text-purple-600'
          }`}>
            Todo App
          </h1>
        </div>
        
        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add new todo"
            className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500' 
                : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'
            }`}
          />
          <button
            onClick={addTodo}
            className={`px-4 py-2 text-white rounded-lg transition-colors ${
              darkMode 
                ? 'bg-purple-700 hover:bg-purple-800' 
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            Add
          </button>
        </div>

        {/* Todo Items List */}
        <div className="space-y-2">
          {todos.map(todo => (
            <div 
              key={todo.id} 
              className={`flex items-center p-3 rounded-lg group transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                  : 'bg-white border-gray-200 hover:bg-gray-100'
              } border ${
                todo.completed ? 'opacity-70' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className={`h-5 w-5 rounded focus:ring-2 ${
                  darkMode 
                    ? 'text-purple-500 focus:ring-purple-600 border-gray-600 bg-gray-700' 
                    : 'text-purple-500 focus:ring-purple-400 border-gray-300 bg-white'
                }`}
              />
              <span 
                className={`ml-3 flex-1 ${
                  todo.completed 
                    ? darkMode 
                      ? 'line-through text-gray-400' 
                      : 'line-through text-gray-500'
                    : darkMode 
                      ? 'text-gray-200' 
                      : 'text-gray-800'
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className={`ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                  darkMode ? 'text-red-400' : 'text-red-600'
                }`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Status Footer */}
        {todos.length > 0 && (
          <div className={`mt-4 text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {todos.filter(t => t.completed).length} of {todos.length} completed
          </div>
        )}
      </div>
    </div>
  );
};