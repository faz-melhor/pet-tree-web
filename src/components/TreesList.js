import React from "react";
import Divider from "@material-ui/core/Divider";
import Tree from "./Tree.js";


function TreesList(props) {

  const { trees } = props;
  const treesLen = trees.length;

  return (
    trees.map((tree, i) => (
      <React.Fragment key={tree.id}>
        <Tree tree={tree} />
        {treesLen !== i + 1 ? <Divider /> : null}
      </React.Fragment>
    ))
  );
}

export default TreesList;
