import React from "react";
import { listFilter } from "../../redux/todoSlice";
import { useDispatch } from "react-redux";

function FilterLink({ setFilterStatus, filterStatus }) {
  // states
  const dispatch = useDispatch();

  const styles = {
    allColor: {
      color: filterStatus === "All" ? "hsl(220, 98%, 61%) " : "inherit",
    },
    activeColor: {
      color: filterStatus === "Active" ? "hsl(220, 98%, 61%)" : "inherit",
    },
    completedColor: {
      color: filterStatus === "Completed" ? "hsl(220, 98%, 61%)" : "inherit",
    },
  };

  const handleListViewClick = (e) => {
    dispatch(listFilter(e.target.innerText));
    setFilterStatus(e.target.innerText);
  };
  return (
    <div className="links">
      <ul className="d-flex justify-content-center align-items-center m-0 ">
        <li style={styles.allColor} onClick={handleListViewClick}>
          all
        </li>
        <li style={styles.activeColor} onClick={handleListViewClick}>
          active
        </li>
        <li style={styles.completedColor} onClick={handleListViewClick}>
          completed
        </li>
      </ul>
    </div>
  );
}

export default FilterLink;
