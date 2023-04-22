import React, { useState, useEffect } from "react";
import "./style.css";

//get items from local storage

const getLcalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const ToDo = () => {
  const [InitialData, setInitialData] = useState("");
  const [items, setItems] = useState(getLcalData());
  const [isEdititem, setIsEdititem] = useState("");
  const [toggleButton, setTogglebuttom] = useState(false);

  //add the item function
  const addItem = () => {
    if (!InitialData) {
      alert("please fill the data");
    } else if (InitialData && toggleButton) {
      setItems(
        items.map((curEle) => {
          if (curEle.id === isEdititem) {
            return { ...curEle, name: InitialData };
          } else {
            return curEle;
          }
        })
      );
      setInitialData([]);
      setIsEdititem(null);
      setTogglebuttom(false);
    } else {
      const myNewInputdata = {
        id: new Date().getTime().toString(),
        name: InitialData,
      };
      setItems([...items, myNewInputdata]);
      setInitialData("");
    }
  };

  //edit the items
  const editItem = (index) => {
    const editedData = items.find((curEle) => {
      return curEle.id === index;
    });
    setInitialData(editedData.name);
    setIsEdititem(index);
    setTogglebuttom(true);
  };

  // delete item section
  const deleteItem = (index) => {
    const updatedItem = items.filter((curEle) => {
      return curEle.id !== index;
    });
    setItems(updatedItem);
  };
  // remove all section
  const removeAll = () => {
    setItems([]);
  };

  // set items locally

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <div className="main-div">
      <div className="child-div">
        <figure>
          <img src="./images/todo.svg" alt="todologo" />
          <figcaption>Add Your List Here ✌</figcaption>
        </figure>
        <div className="addItems">
          <input
            type="text"
            placeholder="✍ Add Item"
            className="form-control"
            value={InitialData}
            onChange={(event) => setInitialData(event.target.value)}
          />
          {toggleButton ? (
            <i className="far fa-edit add-btn" onClick={addItem}></i>
          ) : (
            <i className="fa fa-plus add-btn" onClick={addItem}></i>
          )}
        </div>

        {/* show all the items */}
        <div className="showItems">
          {items.map((curElem) => {
            return (
              <div className="eachItem" key={curElem.id}>
                <h3>{curElem.name}</h3>
                <div className="todo-btn">
                  <i
                    className="far fa-edit add-btn"
                    onClick={() => editItem(curElem.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    onClick={() => deleteItem(curElem.id)}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        {/* remove all button  */}
        <div className="showItems">
          <button
            className="btn effect04 "
            data-sm-link-text="REMOVE ALL"
            onClick={removeAll}
          >
            <span>CHECK LIST</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
