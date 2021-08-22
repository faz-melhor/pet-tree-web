import React from "react";
import Button from "@material-ui/core/Button";

function Tree(props) {

  const { description, owner } = props.tree

  const handleChange = (newTree) => {
    props.changeTree(newTree);
  }

  return (
    <article className="items-center">
      <div className="float-left">
        <b>{description}</b>
        <h1>Plantado por {owner.nickname}</h1>
      </div>
      <div className="space-x-4 float-right align-bottom">
        <Button variant="text" onClick={() => handleChange(props.tree)}>Details</Button>
        <Button variant="text" color="secondary">Reject</Button>
        <Button variant="contained" color="primary">Approve</Button>
      </div>
    </article>
  );
}

export default Tree;
