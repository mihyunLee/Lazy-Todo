import React, {
  useReducer,
  createContext,
  useContext,
  useRef,
  useEffect,
} from "react";

function todoReducer(state, action) {
  let newTodo = [];

  switch (action.type) {
    case "INIT":
      return action.todo;
    case "CREATE":
      newTodo = [...state, action.todo];
      break;
    case "TOGGLE":
      newTodo = state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
      break;
    case "REMOVE":
      newTodo = state.filter((todo) => todo.id !== action.id);
      break;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }

  localStorage.setItem("todos", JSON.stringify(newTodo));

  return newTodo;
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, []);
  const nextId = useRef(0);

  useEffect(() => {
    const storageData = localStorage.getItem("todos");
    if (storageData) {
      const todoList = JSON.parse(storageData);
      if (todoList.length >= 1) {
        nextId.current = parseInt(todoList[todoList.length - 1].id) + 1;
        dispatch({ type: "INIT", todo: todoList });
      }
    }
  }, []);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}
