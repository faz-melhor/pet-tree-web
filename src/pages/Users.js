import React, { useEffect, useReducer, useCallback } from "react";
import { Layout } from "../layout";
import { Paper } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { UserReducer as reducer } from "../reducers";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

function Users({ api }) {
  const defaultState = {
    users: [],
    showAlert: false,
    alertSeverity: "error",
    alertMessage: "",
    alertTitle: "Error",
    isLoading: false
  }

  const [state, dispatch] = useReducer(reducer, defaultState);

  const loadUsersList = useCallback(async () => {
    dispatch({ type: 'LOADING' })
    const [ok, result] = await api.Users.getAll();
    dispatch({ type: 'READY' })

    if (ok) {
      dispatch({ type: 'LOAD_USERS', payload: result });
    } else {
      handleErrorMessage(result);
    }
  }, [api.Users]);

  function handleErrorMessage(message) {
    dispatch({ type: 'SHOW_ERROR', payload: message });

    const timer = setTimeout(() => {
      dispatch({ type: "HIDE_ALERT" });
    }, 5000);

    return () => clearTimeout(timer);
  }

  useEffect(() => {
    loadUsersList();
  }, [loadUsersList]);

  return (
    <Layout>
      <div className="flex justify-center h-5/6">
        <Paper variant="outlined" className="flex bg-white w-1/2">
          {state.isLoading ? <CircularProgress className="m-auto" /> : <UsersList users={state.users} />}
        </Paper>
      </div>
      {state.showAlert && <Alert variant="filled" severity={state.alertSeverity}>
        <AlertTitle>{state.alertTitle}</AlertTitle>
        <strong>{state.alertMessage}</strong>
      </Alert>}
    </Layout>
  )
}

function User({ user }) {
  return (
    <ListItem>
      <h1>{user.name}</h1>
      <h2>{user.nickname}</h2>
      <h2>{user.email}</h2>
    </ListItem>
  );
}

function UsersList({ users }) {

  return (
    <List>
      {users.map((user) => {
        return <User key={user.id} user={user} />
      })}
    </List>
  );
}

export default Users;
