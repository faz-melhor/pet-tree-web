import React from "react";
import treeMarker from "../assets/tree_0.png";

function TreeMarker() {
  return (
    <img style={{ position: 'absolute', transform: 'translateZ(0) translate(-50%, -100%)', backfaceVisibility: 'hidden' }} src={treeMarker} alt="tree-marker" />
  );
}

export default TreeMarker;
