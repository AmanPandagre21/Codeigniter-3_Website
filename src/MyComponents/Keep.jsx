import React, { useState, useEffect } from "react";
import Node from "./Node";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

const getAllData = () => {
  localStorage.getItem("lists");
  let getListData = JSON.parse(localStorage.getItem("lists"));

  if (getListData !== "") {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Keep = () => {
  const [inputData, setInputData] = useState({
    title: "",
    message: "",
  });

  const [fieldsData, setFieldsData] = useState(getAllData());
  const [toggleBtn, setToggleBtn] = useState(true);
  const [editId, setEditID] = useState(null);

  const getInput = (event) => {
    const id = new Date().getTime().toString();
    const { name, value } = event.target;
    setInputData((oldData) => {
      return { ...oldData, id, [name]: value };
    });
  };

  const addFieldsData = () => {
    if (!inputData) {
      alert("please fill the fields");
    } else if (inputData && !toggleBtn) {
      setFieldsData(
        fieldsData.map((arr, ind) => {
          if (arr.id === editId) {
            return {
              ...arr,
              title: inputData.title,
              message: inputData.message,
            };
          }
          return arr;
        })
      );
      setInputData({
        title: "",
        message: "",
      });
      setToggleBtn(true);
    } else {
      setFieldsData((preVal) => {
        return [...preVal, inputData];
      });
      setInputData({
        title: "",
        message: "",
      });
    }
  };

  const deleteNode = (id) => {
    setFieldsData((array) => {
      return array.filter((arr) => {
        return arr.id !== id;
      });
    });
  };

  const editNode = (id) => {
    let editItemData = fieldsData.find((element) => {
      return element.id === id;
    });

    setToggleBtn(false);
    setInputData({ title: editItemData.title, message: editItemData.message });
    setEditID(id);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(fieldsData));
  }, [fieldsData]);

  return (
    <>
      <div className="keep_main_div">
        <h1 className="keep_head">
          {/* <ListAltIcon style={{ fontSize: "40px" }}></ListAltIcon> */}
          KEEP APP
        </h1>
        <div className="keep_center_div">
          <div className="keep_content">
            <input
              type="text"
              name="title"
              value={inputData.title}
              autoComplete="off"
              onChange={getInput}
              placeholder="Title"
            />

            <br />
            <textarea
              rows=""
              column=""
              name="message"
              value={inputData.message}
              onChange={getInput}
              placeholder="Write here.."
            ></textarea>
            <div className="keep_btns">
              {toggleBtn ? (
                <IconButton className="keep_add_btn" onClick={addFieldsData}>
                  <AddIcon />
                </IconButton>
              ) : (
                <IconButton className="keep_add_btn" onClick={addFieldsData}>
                  <EditIcon />
                </IconButton>
              )}
            </div>
          </div>
        </div>
        <div className="keep_nodes_grid">
          {fieldsData.map((arr) => {
            return (
              <Node
                key={arr.id}
                id={arr.id}
                editN={editNode}
                deleteN={deleteNode}
                title={arr.title}
                message={arr.message}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Keep;
