import { useState, useEffect, KeyboardEvent } from 'react';
import { Todo } from '../../../../../Types';
import { useTheme } from '../../../contexts/ThemeProvider';

export const TodoList = () => {
  const { darkMode } = useTheme();
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to parse todos from localStorage', error);
      return [];
    }
  });
  
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to localStorage', error);
    }
  }, [todos]);

  const addTodo = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: trimmedValue, 
        completed: false,
        createdAt: new Date().toISOString()
      }]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
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

  const startEdit = (todo: Todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editText.trim() } : todo
    ));
    setEditId(null);
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  return (
    <div 
      className={`min-h-screen p-6 transition-colors duration-200 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
      aria-live="polite"
    >
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 
            className={`text-3xl font-bold ${
              darkMode ? 'text-purple-400' : 'text-purple-600'
            }`}
            aria-label="Todo App"
          >
            Todo App
          </h1>
          <span 
            className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {todos.length} items
          </span>
        </div>
        
        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add new todo"
            className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500' 
                : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'
            }`}
            aria-label="Add new todo"
          />
          <button
            onClick={addTodo}
            className={`px-4 py-2 text-white rounded-lg transition-colors ${
              darkMode 
                ? 'bg-purple-700 hover:bg-purple-800' 
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
            aria-label="Add todo"
            disabled={!inputValue.trim()}
          >
            Add
          </button>
        </div>

        {/* Todo Items List */}
        <ul className="space-y-2" aria-label="Todo items">
          {todos.map(todo => (
            <li 
              key={todo.id}
              className={`flex items-center p-3 rounded-lg group transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                  : 'bg-white border-gray-200 hover:bg-gray-100'
              } border ${
                todo.completed ? 'opacity-70' : ''
              }`}
            >
              {editId === todo.id ? (
                <div className="flex items-center w-full">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className={`flex-1 px-2 py-1 rounded border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}
                    autoFocus
                  />
                  <button
                    onClick={() => saveEdit(todo.id)}
                    className="ml-2 px-2 py-1 text-green-500"
                    aria-label="Save edit"
                  >
                    ✓
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="ml-1 px-2 py-1 text-red-500"
                    aria-label="Cancel edit"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className={`h-5 w-5 rounded focus:ring-2 ${
                      darkMode 
                        ? 'text-purple-500 focus:ring-purple-600 border-gray-600 bg-gray-700' 
                        : 'text-purple-500 focus:ring-purple-400 border-gray-300 bg-white'
                    }`}
                    aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                  />
                  <span 
                    className={`ml-3 flex-1 cursor-pointer ${
                      todo.completed 
                        ? darkMode 
                          ? 'line-through text-gray-400' 
                          : 'line-through text-gray-500'
                        : darkMode 
                          ? 'text-gray-200' 
                          : 'text-gray-800'
                    }`}
                    onClick={() => startEdit(todo)}
                    onDoubleClick={() => startEdit(todo)}
                    aria-label={`Edit ${todo.text}`}
                  >
                    {todo.text}
                  </span>
                  <div className="flex items-center">
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className={`ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                        darkMode ? 'text-red-400' : 'text-red-600'
                      }`}
                      aria-label={`Delete ${todo.text}`}
                    >
                      ✕
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Status Footer */}
        {todos.length > 0 && (
          <div className={`mt-4 text-sm flex justify-between ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span>
              {todos.filter(t => t.completed).length} of {todos.length} completed
            </span>
            {todos.some(t => t.completed) && (
              <button
                onClick={() => setTodos(todos.filter(t => !t.completed))}
                className={`hover:underline ${
                  darkMode ? 'text-purple-300' : 'text-purple-500'
                }`}
                aria-label="Clear completed"
              >
                Clear completed
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};