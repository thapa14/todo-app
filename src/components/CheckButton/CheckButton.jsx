import React from "react";
import "./checkButton.css";
import { toggleCompleted } from "../../redux/todoSlice";
import { useDispatch } from "react-redux";

function CheckButton({ id, completed }) {
  const dispatch = useDispatch();

  const handleToggleCompletClick = () => {
    dispatch(toggleCompleted({ id: id, completed: !completed }));
  };

  const style = {
    checkSvgStyle: {
      display: completed === true ? "block" : "none",
    },
    checkSvgBackground: {
      background:
        completed === true
          ? "linear-gradient( to right,hsl(192, 100%, 67%),hsl(280, 87%, 65%))"
          : "yellow",
    },
  };

  return (
    <div className="temp">
      <div
        className="checkbox-container d-flex justify-content-center align-items-center"
        style={style.checkSvgBackground}
        onClick={handleToggleCompletClick}
      >
        <svg
          className="checkbox-svg"
          style={style.checkSvgStyle}
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="9"
        >
          <path
            fill="none"
            stroke="#FFF"
            strokeWidth="2"
            d="M1 4.304L3.696 7l6-6"
          />
        </svg>
      </div>
    </div>
  );
}

export default CheckButton;
