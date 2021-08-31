import React, { useEffect, useReducer, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Paper, Tabs, Tab, CircularProgress, Grid } from "@material-ui/core";
import { Alert, AlertTitle, Pagination } from "@material-ui/lab";
import { Layout } from "../layout";
import { TreesList, TreeInfo } from "../components";
import { HomeReducer as reducer } from "../reducers";
import { HomeContext } from "../contexts";

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
    isLoading: false,
    page: 1,
    pageSize: 7,
    totalPages: 0
  }

  const [state, dispatch] = useReducer(reducer, defaultState);

  const loadTreesList = useCallback(async () => {
    dispatch({ type: 'LOADING' })
    const result = await api.Trees.getAll({ status: state.filter, offset: ((state.page - 1) * state.pageSize), limit: state.pageSize });
    dispatch({ type: 'READY' })

    if (result.ok) {
      dispatch({ type: 'LOAD_TREES', payload: result.trees, total_trees: result.total });
    } else {
      handleErrorMessage(result.message);

      if (result.status === 401 || result.status === 403) {
        api.Auth.signout();
        history.push('/signin');
      }
    }
  }, [state.filter, api.Trees, api.Auth, history, state.page, state.pageSize]);

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
    const result = await api.Trees.updateTreeStatus(treeId, newStatus);

    if (result.ok) {
      loadTreesList();
    } else {
      handleErrorMessage(result.message);

      if (result.status === 401 || result.status === 403) {
        api.Auth.signout();
        history.push('/signin');
      }
    }
  }

  function handlePageChange(e, value) {
    dispatch({ type: 'PAGE_CHANGE', payload: value });
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

        <Grid container direction="row" justifyContent="center" alignItems="flex-start" className="flex flex-row h-5/6">
          <Paper elevation={3} style={{ minHeight: "90%" }} className="h-auto space-y-5 flex flex-col m-5 p-5 my-1 w-5/12">
            {state.isLoading ? <CircularProgress className="m-auto" /> : <TreesList trees={state.trees} />}
          </Paper>
          <Paper elevation={3} style={{ height: "90%" }} className="m-5 p-5 my-1 bg-white w-5/12">
            <TreeInfo tree={state.tree} />
          </Paper>
        </Grid>
        {state.totalPages > 1 ? <Pagination className="flex justify-center" count={state.totalPages} color="primary" onChange={(e, value) => handlePageChange(e, value)} /> : null}
        {state.showAlert && <Alert variant="filled" severity={state.alertSeverity}>
          <AlertTitle>{state.alertTitle}</AlertTitle>
          <strong>{state.alertMessage}</strong>
        </Alert>}
      </HomeContext.Provider>
    </Layout>
  );
}

export default Home;
