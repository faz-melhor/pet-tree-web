import React, { useState, useEffect } from "react";
import { Layout } from "../layout";
import { Paper, Tabs, Tab } from "@material-ui/core";
import { trees } from "../mock/trees";
import { TreesList, TreeInfo } from "../components";

function Home() {
  const [status, setStatusFilter] = useState({ treeStatus: "pending", trees: [] });

  useEffect(() => {
    let newTrees = trees.filter(tree => tree.status === "pending");
    setStatusFilter({ treeStatus: status.treeStatus, trees: newTrees });
  }, [])

  const handleStatusFilterChange = (_, newStatus) => {

    let newTrees = [];

    if (newStatus === "approved") {
      newTrees = trees.filter(tree => tree.status === "approved");
      setTree(undefined);
    } else if (newStatus === "rejected") {
      newTrees = trees.filter(tree => tree.status === "rejected");
      setTree(undefined);
    } else {
      newTrees = trees.filter(tree => tree.status === "pending");
      setTree(undefined);
    }

    setStatusFilter({ treeStatus: newStatus, trees: newTrees });
  };

  const [tree, setTree] = useState(undefined);

  function handleTreeInfoChange(newTree) {
    setTree(newTree);
  };

  return (
    <Layout>

      <Paper elevation={3} className="w-full m-2 mb-1 max-w-min mx-auto">
        <Tabs
          value={status.treeStatus}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleStatusFilterChange}
        >
          <Tab label="pending" value="pending" />
          <Tab label="approved" value="approved" />
          <Tab label="rejected" value="rejected" />
        </Tabs>
      </Paper>

      <div className="flex flex-row h-5/6">
        <Paper variant="outlined" className="space-y-5 flex flex-col m-5 p-5 my-1 bg-white w-1/2">
          <TreesList trees={status.trees} changeTree={handleTreeInfoChange} />
        </Paper>
        <Paper variant="outlined" className="m-5 p-5 my-1 bg-white w-1/2">
          <TreeInfo tree={tree} />
        </Paper>
      </div>
    </Layout>
  );
}

export default Home;
