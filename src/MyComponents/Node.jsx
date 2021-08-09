import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditIcon from "@material-ui/icons/Edit";

const Node = ({ id, title, message, deleteN, editN }) => {
  return (
    <>
      <div className="keep_node">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="keep_node_btns">
          <IconButton className="keep_node_edit_btn" onClick={() => editN(id)}>
            <EditIcon />
          </IconButton>
          <IconButton className="keep_node_del_btn" onClick={() => deleteN(id)}>
            <DeleteForeverRoundedIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Node;
