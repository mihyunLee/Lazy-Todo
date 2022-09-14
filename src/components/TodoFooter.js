import React from "react";
import styled from "styled-components";
import { useTodoState } from "../TodoContext";

const TodoFooterBlock = styled.div`
  padding-top: 24px;
  padding-left: 32px;
  padding-right: 32px;
  border-top: 1px solid #e9ecef;
  .tasks-finish {
    color: #83888d;
    font-size: 18px;
    font-weight: bold;
  }
`;

const TodoFooter = () => {
  const todos = useTodoState();
  const doneTasks = todos.filter((todo) => todo.done);

  return (
    <TodoFooterBlock>
      <div className="tasks-finish">✨ 완료한 일 : {doneTasks.length}개</div>
    </TodoFooterBlock>
  );
};

export default TodoFooter;
