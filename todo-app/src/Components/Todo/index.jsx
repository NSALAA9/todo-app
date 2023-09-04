
import React, { useEffect, useState, useContext } from "react";
import useForm from "../../hooks/form.js";
import { v4 as uuid } from "uuid";
import { settingsContext } from "../../Context/SettingsContext.jsx";
import List from "../List";


const Todo = () => {
  const {list,setList,incomplete,setIncomplete} = useContext(settingsContext);

  const [defaultValues] = useState({
    difficulty: 4,
  });
  // const [list, setList] = useState([]);
  // const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
    deleteItem(id)
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <>
      <header data-testid="todo-header">
        <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
          <input
            onChange={handleChange}
            name="text"
            type="text"
            placeholder="Item Details"
          />
        </label>

        <label>
          <span>Assigned To</span>
          <input
            onChange={handleChange}
            name="assignee"
            type="text"
            placeholder="Assigne Name"
          />
        </label>

        <label>
          <span>Difficulty</span>
          <input
            onChange={handleChange}
            defaultValue={defaultValues.difficulty}
            type="range"
            min={1}
            max={5}
            name="difficulty"
          />
        </label>

        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>

      <List list = {list} toggleComplete={toggleComplete}>
       

        {/* {list.map((item) => (
          <div key={item.id}>
            <p>{item.text}</p>
            <p>
              <small>Assigned to: {item.assigne}</small>
            </p>
            <p>
              <small>Difficulty: {item.difficulty}</small>
            </p>
            <div onClick={() => toggleComplete(item.id)}>
              Complete: {item.complete.toString()}
            </div>
            <hr />
          </div>
        ))} */}


        </List>
    </>
  );
};

export default Todo;