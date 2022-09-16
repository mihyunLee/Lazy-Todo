import React from "react";
import { createGlobalStyle } from "styled-components";
import TodoCreate from "./components/TodoCreate";
import TodoFooter from "./components/TodoFooter";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";
import { TodoProvider } from "./TodoContext";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "NotoSans";
    src: url("https://cdn.jsdelivr.net/npm/noto-sans-kr@0.1.1/fonts/NotoSans-Regular.woff2")
    format("woff")
  }
  *{
    font-family: "NotoSans";

    -ms-overflow-style: none;

    ::-webkit-scrollbar {
      display: none;
    }
  }
  body{
    background: #e9ecef;

  }
`;

function App() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList done={false} />
        <TodoFooter />
        <TodoList done={true} />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App;
