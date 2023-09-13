
import React, { useContext, useEffect, useState } from "react";
import { Pagination, CloseButton } from "@mantine/core";
import { settingsContext } from "../../Context/SettingsContext";

export default function List(props) {
  const settingsState = useContext(settingsContext);
  const [itemsToDisplay, setItemToDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  console.log("itemstodisplay before", itemsToDisplay);

  useEffect(() => {
    const startIndex = (currentPage - 1) * parseInt(settingsState.itemsPerPage);
    const endIndex = startIndex + parseInt(settingsState.itemsPerPage);
    console.log(startIndex, endIndex);
    setItemToDisplay(props.list.slice(startIndex, endIndex));
  }, [props.list, settingsState.itemsPerPage, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    console.log("new Page // handleItemsPerPageChange", typeof newPage);
  };

  return (
    <div>
      {itemsToDisplay.map((item) => (
        <div key={item.id}>
          <CloseButton onClick={() => props.toggleDelete(item.id)} />
          <p>{item.text}</p>
          <p>
            <small>Assigned to: {item.assignee}</small>
          </p>
          <p>
            <small>Difficulty: {item.difficulty}</small>
          </p>
          <div onClick={() => props.toggleComplete(item.id)}>
            Complete: {item.complete.toString()}
          </div>

          <hr />
        </div>
      ))}

      {props.list.length > settingsState.itemsPerPage && (
        <Pagination
          total={Math.ceil(props.list.length / settingsState.itemsPerPage)}
          value={currentPage}
          onChange={handlePageChange}
          position="center"
          styles={(theme) => ({
            control: {
              "&[data-active]": {
                backgroundImage: theme.fn.gradient({
                  from: "blue",
                  to: "black",
                }),
                border: 0,
              },
            },
          })}
        />
      )}
    </div>
  );
}