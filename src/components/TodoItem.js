import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete, MdEdit, MdCheck } from "react-icons/md";
import { useTodoDispatch } from "../TodoContext";

const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
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

const Text = styled.textarea`
  flex: 1;
  resize: none;
  height: ${({ row }) => row * 42 + 4}px;
  border: none;
  outline: none;
  background-color: #38d9a9;
  line-height: 42px;
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

  const textRef = useRef(null);

  const [textareaHeight, setTextareaHeight] = useState({
    row: 1,
    lineBreak: {},
  });

  const onToggle = () => dispatch({ type: "TOGGLE", id });
  const onRemove = () => dispatch({ type: "REMOVE", id });
  const onEdit = () => {
    textRef.current.readOnly = !textRef.current.readOnly;
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

  // 사용자 입력 업데이트 및 줄바꿈 감지
  const handleResizeTextarea = (e) => {
    const { scrollHeight, clientHeight, value } = e.target;

    // (1) 스크롤 생성 시
    if (scrollHeight > clientHeight) {
      setTextareaHeight((prev) => ({
        row: prev.row + 1,
        lineBreak: { ...prev.lineBreak, [value.length - 1]: true },
      }));
    }

    // (2) 텍스트를 지워서 줄바꿈 지점에 도달했을 경우
    if (textareaHeight.lineBreak[value.length]) {
      setTextareaHeight((prev) => ({
        row: prev.row - 1,
        lineBreak: { ...prev.lineBreak, [value.length]: false },
      }));
    }
  };

  // 엔터 키 입력
  const onKeyEnter = (e) => {
    if (e.code === "Enter") {
      setTextareaHeight((prev) => ({
        row: prev.row + 1,
        lineBreak: { ...prev.lineBreak, [e.target.value.length]: true },
      }));
    }
  };

  useEffect(() => {
    if (isEdit) {
      textRef.current.focus();
    }
  }, [isEdit]);

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text
        readOnly
        ref={textRef}
        done={done}
        value={newTodo}
        onChange={onChangeTodoInput}
        onInput={handleResizeTextarea}
        onKeyDown={onKeyEnter}
        row={textareaHeight.row}
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
