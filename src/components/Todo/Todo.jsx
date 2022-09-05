import React from "react";
import "./Scss/Todo.css";
import cross from "../../images/icon-cross.svg";
import { useDispatch } from "react-redux/es/exports";
import { deleteTodo, toggleCompleted } from "../../redux/todoSlice";
import CheckButton from "../CheckButton/CheckButton";

function Todo({ value, theme }) {
  const dispatch = useDispatch();
  const { id, content, completed } = value;

  const handleToggleCompletClick = () => {
    dispatch(toggleCompleted({ id: id, completed: !completed }));
  };

  const handleDeleteClick = () => {
    dispatch(deleteTodo(id));
  };

  const styles = {
    darkTheme: {
      contentDecoration: {
        textDecoration: completed ? "line-through" : "none",
        color: completed ? "hsl(233deg, 14%, 35%)" : "hsl(234deg, 39%, 85%)",
      },
    },
    lightTheme: {
      contentDecoration: {
        textDecoration: completed ? "line-through" : "none",
        color: completed ? "hsl(236deg, 9%, 61%)" : "hsl(235deg, 19%, 35%)",
      },
    },
  };

  return (
    <>
      <div className="todo-item d-flex justify-content-start align-items-center">
        <div className="checkbox d-flex justify-content-center align-items-center">
          <CheckButton id={id} completed={completed} />
        </div>
        <p
          style={
            theme === "dark-theme"
              ? styles.darkTheme.contentDecoration
              : styles.lightTheme.contentDecoration
          }
          className="m-0 todo-content"
          id="todo-content-para"
          onClick={handleToggleCompletClick}
        >
          {content}
        </p>
        <img
          src={cross}
          alt="del"
          className="delete-note"
          onClick={handleDeleteClick}
        />
      </div>
    </>
  );
}

export default Todo;
