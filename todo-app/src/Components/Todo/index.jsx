
import React, { useEffect, useState, useContext } from "react";
import useForm from "../../hooks/form.js";
import { v4 as uuid } from "uuid";
import { settingsContext } from "../../Context/SettingsContext.jsx";
import List from "../List";
import { Paper, Input, Button, Slider, Text } from '@mantine/core';
import './styles.scss'

const Todo = () => {
  const {list,setList,incomplete,setIncomplete} = useContext(settingsContext);

  const [defaultValues] = useState({
    difficulty: 4,
  });
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
    <div className="all">
      <header data-testid="todo-header">
        <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
      </header>

      <Paper
      padding="lg"
      shadow="xl"
      style={{
        width: '300px',
        height: '500px',
        marginLeft: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px', 
      }}
    >
      <form onSubmit={handleSubmit}>
        <h2>Add To Do Item</h2>

        <div style={{ width: '100%', marginBottom: '10px' }}>
          <Text align="left" size="m">
            To Do Item
          </Text>
          <Input
            style={{ borderRadius: '10px', borderWidth: '2px', width: '100%' }}
            onChange={handleChange}
            name="text"
            placeholder="Item Details"
            required
          />
        </div>

        <div style={{ width: '100%', marginBottom: '10px' }}>
          <Text align="left" size="m">
            Assigned To
          </Text>
          <Input
            style={{ borderRadius: '8px', borderWidth: '2px', width: '100%' }}
            onChange={handleChange}
            name="assigne"
            placeholder="Assigne Name"
            required
          />
        </div>

        <div style={{ width: '100%', marginBottom: '10px' }}>
          <Text align="left" size="m">
            Difficulty
          </Text>
          <Slider
            onChange={(value) => handleChange({ target: { name: 'difficulty', value } })}
            defaultValue={defaultValues.difficulty}
            min={1}
            max={5}
          />
        </div>

        <Button type="submit" variant="filled">
          Add Item
        </Button>
      </form>
    </Paper>

      <List list = {list} toggleComplete={toggleComplete} deleteItem={deleteItem}>
       

 


        </List>
        </div>
    </>

  );
};

export default Todo;