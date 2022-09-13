import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete, MdEdit, MdCheck } from "react-icons/md";
import { useTodoDispatch } from "../TodoContext";

const Edit = styled.div`
  display: flex;
  align-items center;
  justify-content: center;
  margin-right: 5px;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &: hover {
    color: #38d9a9;
  }
  display: none;
`;

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
    ${Edit} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

const TodoItem = ({ id, done, text }) => {
  const dispatch = useTodoDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [newTodo, setNewTodo] = useState(text);

  const inputRef = useRef(null);

  const onToggle = () => dispatch({ type: "TOGGLE", id });
  const onRemove = () => dispatch({ type: "REMOVE", id });
  const onEdit = () => {
    inputRef.current.readOnly = false;
    if (isEdit) {
      dispatch({
        type: "Edit",
        todo: {
          id,
          text: newTodo,
          done,
        },
      });
    }
    setIsEdit(!isEdit);
  };
  const onChangeTodoInput = (e) => {
    setNewTodo(e.target.value);
  };

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text
        readOnly
        ref={inputRef}
        done={done}
        value={newTodo}
        onChange={onChangeTodoInput}
      />
      <Edit done={done} onClick={onEdit}>
        {!done && (!isEdit ? <MdEdit /> : <MdCheck />)}
      </Edit>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
};

export default React.memo(TodoItem);
