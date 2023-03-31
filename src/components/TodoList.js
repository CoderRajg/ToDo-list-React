import React, { useState, useEffect } from "react";
import "./index.css";

// now we have to get the items from local strg nad save it
const getLocalData = function(){
    const lists = localStorage.getItem("myTodoItems");
    if(lists){
        return JSON.parse(lists);
    }
}

function TodoList() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditedItem , setIsEditedItem] = useState("");
  const [toggleButton , setToggleButton] = useState(false);

  // i am writting additem function here
  const addItem = function () {
    if (!inputData) {
      alert("Please fill the data first!");
    } else if(inputData && toggleButton){
        setItems(
            items.map((curElem)=>{
                if(curElem.id === isEditedItem){
                    return{...curElem , name: inputData}
                }
                return curElem;
            })
        )
        setInputData("")
    setIsEditedItem(null);
    setToggleButton(false);
    }
    else {
      const myInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myInputData]);
      setInputData("");
    }
  };
  // i am going to edit the items
  const editItem = function(index){
    const todo_edited = items.find((curElem)=>{
        return curElem.id === index;
    });
    setInputData(todo_edited.name)
    setIsEditedItem(index);
    setToggleButton(true);
  }

  //   now we have to wirte a function to delete the item
  const delteItem = function (index) {
    const updateItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updateItems);
  };

  // now i am implementing the function to remove all the item at one click
  const removeAll = function () {
    setItems([]);
  };

  //to add local storage we have to use useEffect
  useEffect(() => {
    localStorage.setItem("myTodoItems" , JSON.stringify(items))
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todoimage" />
            <figcaption>Add you list to best ToDo List ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ add itme"
              className="form-control"
              value={inputData}
              onChange={(e) => {
                setInputData(e.target.value);
              }}
            />
            {
                toggleButton ? <i className="far fa-edit add-btn" onClick={addItem}></i>
                : <i className="fa fa-plus add-btn" onClick={addItem}></i>
            }
          </div>

          {/* i am going to show all itmes here */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={()=>{editItem(curElem.id)}}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => {
                        delteItem(curElem.id);
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          {/* remove all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;
