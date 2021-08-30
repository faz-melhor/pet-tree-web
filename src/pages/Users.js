import React, { useEffect, useReducer, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Layout } from "../layout";
import { Paper } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { UserReducer as reducer } from "../reducers";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";

function Users({ api }) {
  const history = useHistory();
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
    const [ok, result, status] = await api.Users.getAll();
    dispatch({ type: 'READY' })

    if (ok) {
      dispatch({ type: 'LOAD_USERS', payload: result });
    } else {
      handleAlert(result, "error");

      if (status === 401 || status === 403) {
        api.Auth.signout();
        history.push('/signin');
      }
    }
  }, [api.Users, api.Auth, history]);

  function handleAlert(message, type) {
    if (type === "error") {
      dispatch({ type: 'SHOW_ERROR', payload: message });
    } else {
      dispatch({ type: 'SHOW_INFO', payload: message });
    }

    const timer = setTimeout(() => {
      dispatch({ type: "HIDE_ALERT" });
    }, 5000);

    return () => clearTimeout(timer);
  }

  useEffect(() => {
    loadUsersList();
  }, [loadUsersList]);

  async function handleUserRoleChange(userId, roles) {
    const [ok, result, status] = await api.Users.updateUserRoles(userId, roles);

    if (ok) {
      handleAlert("Roles successfully changed!", "info");
      loadUsersList();
    } else {
      handleAlert(result, "error", status);

      if (status === 401 || status === 403) {
        api.Auth.signout();
        history.push('/signin');
      }
    }
  }

  function renderActionButtons(userId, isAdmin) {
    if (isAdmin) {
      return (
        <Button variant="contained" onClick={() => handleUserRoleChange(userId, ["user"])} color="secondary">Demote</Button>
      );
    } else {
      return (
        <Button variant="contained" onClick={() => handleUserRoleChange(userId, ["user", "admin"])} color="primary">Promote</Button>
      );
    }
  }

  function User({ user }) {
    const isAdmin = user.roles.includes("admin");

    return (
      <TableRow key={user.id}>
        <TableCell><ListItemText primary={user.nickname} secondary={user.name} /></TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{isAdmin.toString().charAt(0).toUpperCase() + isAdmin.toString().slice(1)}</TableCell>
        <TableCell>
          {renderActionButtons(user.id, isAdmin)}
        </TableCell>
      </TableRow>
    );
  }

  function UsersList({ users }) {

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nickname/Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Is an Admin?</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

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

export default Users;
