import React, { useContext, useEffect } from "react";
import { settingsContext } from "../../Context/Setting/index";
import { Select, Button } from "@mantine/core";

export default function SettingsPage(props) {
  const settingsState = useContext(settingsContext);

  const toggleComplete = (id) => {
    const items = settingsState.list.map((item) => {
      if (item.id === id) {
        item.complete = "complete";
        settingsState.setIncomplete(item.complete);
        settingsState.setHideCompleted(false);
      }
      return item;
    });
    settingsState.setList(items);
    console.log(items, 'this is from ')
  };
  
  
  const handleItemsPerPageChange = (value) => {
    settingsState.setItemsPerPage(value);
  };

  useEffect(() => {
    const storedItemsPerPage = localStorage.getItem("itemsPerPage");
    if (storedItemsPerPage) {
      settingsState.setItemsPerPage(storedItemsPerPage);
    }

    const storedSort = localStorage.getItem("sort");
    if (storedSort) {
      settingsState.setSort(storedSort);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("itemsPerPage", settingsState.itemsPerPage);
    localStorage.setItem("sort", settingsState.sort);
  }, [settingsState.itemsPerPage, settingsState.sort]);
 

  return (
    <div>
      <header>
        <h1>Manage Settings</h1>
      </header>

      <form>
        <h2>Update Settings</h2>
        <label className="switch">
          <input type="checkbox" onChange={toggleComplete} />
          <span className="slider round"></span>
        </label>

        <p>Show Completed ToDos</p>

        <div className="select-list">
          <label>
            <span>Items per page:</span>
          </label>
          <Select
            id="items-per-page"
            value={settingsState.itemsPerPage}
            onChange={(value) => handleItemsPerPageChange(...value,value)}
            data={[
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
              { label: "6", value: "6" },
              { label: "10", value: "10" },
            ]}
          />
        </div>

        <p>Sort Keyword</p>
        <input type="text" placeholder={settingsState.sort} />
        <br />

        <Button>Show New Settings</Button>
      </form>
    </div>
  );
}