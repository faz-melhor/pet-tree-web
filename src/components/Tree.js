import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { HomeContext } from "../contexts";

function Tree(props) {

  const { tree } = props
  const { handleTreeInfoChange, changeStatus, tab } = useContext(HomeContext);
  const { description, owner, id } = tree

  function handleChange(newTree) {
    handleTreeInfoChange(newTree);
  }

  function handleUpdate(treeId, newStatus) {
    changeStatus(treeId, newStatus);
  }

  function renderButtons(tab) {

    if (tab === "pending") {
      return (
        <React.Fragment>
          <Button variant="text" onClick={() => handleUpdate(id, "rejected")} color="secondary">Reject</Button>
          <Button variant="contained" onClick={() => handleUpdate(id, "accepted")} color="primary">Accept</Button>
        </React.Fragment>
      );
    } else if (tab === "accepted") {
      return (
        <React.Fragment>
          <Button variant="text" onClick={() => handleUpdate(id, "rejected")} color="secondary">Reject</Button>
          <Button variant="contained" onClick={() => handleUpdate(id, "pending")} color="primary">Move to Pending</Button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Button variant="text" onClick={() => handleUpdate(id, "pending")} color="secondary">Move to Pending</Button>
          <Button variant="contained" onClick={() => handleUpdate(id, "accepted")} color="primary">Accept</Button>
        </React.Fragment>
      );
    }
  }

  return (
    <article className="items-center">
      <div className="float-left">
        <b>{description}</b>
        <h1>Plantado por {owner.nickname}</h1>
      </div>
      <div className="space-x-4 float-right align-bottom">
        <Button variant="text" onClick={() => handleChange(tree)}>Details</Button>
        {renderButtons(tab)}
      </div>
    </article>
  );
}

export default Tree;
