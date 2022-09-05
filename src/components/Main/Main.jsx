import React, { useState, useEffect } from "react";
import "./scss/Main.css";
import "./scss/Main_mobile.css";
import Todo from "../Todo/Todo";
import sun from "../../images/icon-sun.svg";
import moon from "../../images/icon-moon.svg";

// reducers
import { useSelector, useDispatch } from "react-redux";
import { addTodo, clearCompleted } from "../../redux/todoSlice";
import FilterLink from "../FilterLink/FilterLink";

function Main() {
  // states
  const [inputNoteValue, setInputNoteValue] = useState("");
  const initialFilterStatus = useSelector((state) => state.todos.filtered);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("dark-theme");
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const changeInnerWidth = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeInnerWidth);
    return () => window.removeEventListener("resize", changeInnerWidth);
  }, [innerWidth]);

  // redux state
  const todoList = useSelector((state) => state.todos.list);

  // total list
  const filteredTodoList = todoList.filter((value) => {
    if (filterStatus === "All") return true;
    if (filterStatus === "Active") {
      return value.completed === false;
    } else return value.completed === true;
  });

  // this is the remaining items count
  const remainingItems = todoList.filter((todo) => todo.completed === false);

  // this is for the note submision
  const submitNote = (e) => {
    e.preventDefault();
    dispatch(addTodo({ content: inputNoteValue }));
    setInputNoteValue("");
  };
  // this is clear all completed function
  const handleClearCompletedClick = () => dispatch(clearCompleted());

  // this is the list view section

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleToggleDarkThemeClick = () => {
    if (theme === "dark-theme") setTheme("light-theme");
    else setTheme("dark-theme");
  };
  return (
    <>
      <main>
        <div className="m-wrapper d-flex flex-column ">
          <header className="d-flex justify-content-between align-items-center">
            <h1 className="text-uppercase text-white">todo</h1>
            {theme === "dark-theme" ? (
              <img src={sun} alt="" onClick={handleToggleDarkThemeClick} />
            ) : (
              <img src={moon} alt="" onClick={handleToggleDarkThemeClick} />
            )}
          </header>
          <div className="todo-app-body d-flex flex-column">
            {/* this is the note create area  */}

            <section>
              <form
                className="d-flex justify-content-start align-items-center"
                onSubmit={submitNote}
              >
                <div>
                  <input type="submit" value="" />
                </div>
                <input
                  type="text"
                  placeholder="Create a new todo..."
                  value={inputNoteValue}
                  onChange={(e) => setInputNoteValue(e.target.value)}
                  required
                />
              </form>
            </section>

            <section className="main-section ">
              <div className="list">
                {filteredTodoList.map((value) => {
                  return <Todo key={value.id} value={value} theme={theme} />;
                })}
              </div>

              <div className="menu-bar d-flex justify-content-between align-items-center px-4">
                <p className="left-todo-number m-0">
                  {remainingItems.length} items left
                </p>

                {innerWidth > 375 && (
                  <FilterLink
                    setFilterStatus={setFilterStatus}
                    filterStatus={filterStatus}
                  />
                )}

                <button onClick={handleClearCompletedClick}>
                  clear completed
                </button>
              </div>
            </section>
          </div>
          {innerWidth < 376 && (
            <section>
              <FilterLink
                setFilterStatus={setFilterStatus}
                filterStatus={filterStatus}
              />
            </section>
          )}
        </div>
      </main>
    </>
  );
}

export default Main;
