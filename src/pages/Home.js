import React, { useEffect, useReducer, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Layout } from "../layout";
import { Paper, Tabs, Tab } from "@material-ui/core";
import { TreesList, TreeInfo } from "../components";
import { Alert, AlertTitle } from "@material-ui/lab";
import { HomeReducer as reducer } from "../reducers";
import { HomeContext } from "../contexts";
import CircularProgress from "@material-ui/core/CircularProgress";

function Home({ api }) {

  const history = useHistory();
  const defaultState = {
    trees: [],
    filter: "pending",
    tree: undefined,
    showAlert: false,
    alertSeverity: "error",
    alertMessage: "",
    alertTitle: "Error",
    isLoading: false
  }

  const [state, dispatch] = useReducer(reducer, defaultState);

  const loadTreesList = useCallback(async () => {
    dispatch({ type: 'LOADING' })
    const [ok, result, status] = await api.Trees.getAll({ status: state.filter });
    dispatch({ type: 'READY' })

    if (ok) {
      dispatch({ type: 'LOAD_TREES', payload: result });
    } else {
      handleErrorMessage(result);

      if (status === 401 || status === 403) {
        api.Auth.signout();
        history.push('/signin');
      }
    }
  }, [state.filter, api.Trees, api.Auth, history]);

  useEffect(() => {
    loadTreesList();
  }, [state.filter, loadTreesList]);

  function handleErrorMessage(message) {
    dispatch({ type: 'SHOW_ERROR', payload: message });

    const timer = setTimeout(() => {
      dispatch({ type: "HIDE_ALERT" });
    }, 5000);

    return () => clearTimeout(timer);
  }

  function handleStatusFilterChange(_, newFilter) {
    dispatch({ type: 'CHANGE_FILTER', payload: newFilter });
  }

  function handleTreeInfoChange(newTree) {
    dispatch({ type: 'CHANGE_TREE', payload: newTree });
  };

  async function changeStatus(treeId, newStatus) {
    let [ok, result, status] = await api.Trees.updateTreeStatus(treeId, newStatus);

    if (ok) {
      loadTreesList();
    } else {
      handleErrorMessage(result);

      if (status === 401 || status === 403) {
        api.Auth.signout();
        history.push('/signin');
      }
    }
  }

  return (
    <Layout>
      <HomeContext.Provider value={{ handleTreeInfoChange: handleTreeInfoChange, changeStatus: changeStatus, tab: state.filter }}>
        <Paper elevation={3} className="w-full m-2 mb-1 max-w-min mx-auto">
          <Tabs
            value={state.filter}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleStatusFilterChange}
          >
            <Tab label="pending" value="pending" />
            <Tab label="accepted" value="accepted" />
            <Tab label="rejected" value="rejected" />
          </Tabs>
        </Paper>

        <div className="flex flex-row h-5/6">
          <Paper elevation={2} variant="outlined" className="space-y-5 flex flex-col m-5 p-5 my-1 bg-white w-1/2">
            {state.isLoading ? <CircularProgress className="m-auto" /> : <TreesList trees={state.trees} />}
          </Paper>
          <Paper elevation={2} variant="outlined" className="m-5 p-5 my-1 bg-white w-1/2">
            <TreeInfo tree={state.tree} />
          </Paper>
        </div>
        {state.showAlert && <Alert variant="filled" severity={state.alertSeverity}>
          <AlertTitle>{state.alertTitle}</AlertTitle>
          <strong>{state.alertMessage}</strong>
        </Alert>}
      </HomeContext.Provider>
    </Layout>
  );
}

export default Home;
