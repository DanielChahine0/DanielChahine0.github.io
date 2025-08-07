# Building Scalable React Applications with Modern Patterns

*Published on December 15, 2024*

React has evolved tremendously over the years, and with it, the patterns and practices we use to build scalable applications. In this post, we'll explore some of the most effective modern patterns that can help you build maintainable and scalable React applications.

## Custom Hooks: The Building Blocks of Reusability

Custom hooks are one of the most powerful patterns in modern React development. They allow us to extract component logic into reusable functions.

```javascript
// useLocalStorage custom hook
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
```

## Context Optimization Strategies

Context is powerful but can lead to performance issues if not used carefully. Here are some optimization strategies:

### 1. Split Contexts by Concern

Instead of having one large context, split them by functionality:

```javascript
// User context for authentication
const UserContext = createContext();

// Theme context for UI theming
const ThemeContext = createContext();

// Settings context for app settings
const SettingsContext = createContext();
```

### 2. Use Context Selectors

For complex state, consider using context selectors to prevent unnecessary re-renders:

```javascript
const StateContext = createContext();
const DispatchContext = createContext();

function useAppState(selector) {
  const state = useContext(StateContext);
  return selector ? selector(state) : state;
}
```

## Component Composition Patterns

### Compound Components

This pattern is great for creating flexible and reusable components:

```javascript
function Select({ children, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="select" {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

Select.Button = function SelectButton({ children, ...props }) {
  const { setIsOpen } = useContext(SelectContext);
  return (
    <button onClick={() => setIsOpen(prev => !prev)} {...props}>
      {children}
    </button>
  );
};

Select.Options = function SelectOptions({ children, ...props }) {
  const { isOpen } = useContext(SelectContext);
  return isOpen ? <div {...props}>{children}</div> : null;
};
```

## Performance Optimization Techniques

### 1. Memoization

Use `React.memo`, `useMemo`, and `useCallback` strategically:

```javascript
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: expensiveCalculation(item)
    }));
  }, [data]);

  const handleUpdate = useCallback((id, newValue) => {
    onUpdate(id, newValue);
  }, [onUpdate]);

  return (
    <div>
      {processedData.map(item => (
        <Item 
          key={item.id} 
          data={item} 
          onUpdate={handleUpdate} 
        />
      ))}
    </div>
  );
});
```

### 2. Code Splitting

Implement route-based and component-based code splitting:

```javascript
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

## State Management Patterns

### 1. Reducer Pattern

For complex state logic, useReducer is often better than useState:

```javascript
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo => 
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  
  // Component logic here
}
```

## Testing Strategies

### Component Testing

Write tests that focus on behavior rather than implementation:

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('should add new todo when form is submitted', async () => {
  const user = userEvent.setup();
  render(<TodoApp />);
  
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /add todo/i });
  
  await user.type(input, 'New todo item');
  await user.click(button);
  
  expect(screen.getByText('New todo item')).toBeInTheDocument();
});
```

## Conclusion

These patterns form the foundation of scalable React applications. Remember:

- **Custom hooks** for reusable logic
- **Context optimization** for performance
- **Component composition** for flexibility
- **Strategic memoization** for performance
- **Proper testing** for reliability

By applying these patterns consistently, you'll build React applications that are not only scalable but also maintainable and enjoyable to work with.

---

*What patterns do you find most useful in your React projects? Let me know in the comments below!*
