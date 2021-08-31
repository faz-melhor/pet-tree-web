import React, { useEffect, useReducer, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Paper, CircularProgress, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@material-ui/core";
import { Alert, AlertTitle, Pagination } from "@material-ui/lab";
import { Layout } from "../layout";
import { UserReducer as reducer } from "../reducers";

function Users({ api }) {
  const history = useHistory();
  const defaultState = {
    users: [],
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

  const loadUsersList = useCallback(async () => {
    dispatch({ type: 'LOADING' })
    const result = await api.Users.getAll({ offset: ((state.page - 1) * state.pageSize), limit: state.pageSize });
    dispatch({ type: 'READY' })

    if (result.ok) {
      dispatch({ type: 'LOAD_USERS', payload: result.users, total_users: result.total });
    } else {
      handleAlert(result.message, "error");

      if (result.status === 401 || result.status === 403) {
        api.Auth.signout();
        history.push('/signin');
      }
    }
  }, [api.Users, api.Auth, history, state.page, state.pageSize]);

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
    const result = await api.Users.updateUserRoles(userId, roles);

    if (result.ok) {
      handleAlert("Roles successfully changed!", "info");
      loadUsersList();
    } else {
      handleAlert(result.message, "error");

      if (result.status === 401 || result.status === 403) {
        api.Auth.signout();
        history.push('/signin');
      }
    }
  }

  function handlePageChange(e, value) {
    dispatch({ type: 'PAGE_CHANGE', payload: value });
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
      <TableContainer elevation={0} component={Paper}>
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
      <div style={{ minHeight: "90%" }} className="flex justify-center h-auto">
        <Paper elevation={3} className="flex bg-white w-1/2 m-5 p-5">
          {state.isLoading ? <CircularProgress className="m-auto" /> : <UsersList users={state.users} />}
        </Paper>
      </div>
      {state.totalPages > 1 ? <Pagination className="flex justify-center" count={state.totalPages} color="primary" onChange={(e, value) => handlePageChange(e, value)} /> : null}
      {state.showAlert && <Alert variant="filled" severity={state.alertSeverity}>
        <AlertTitle>{state.alertTitle}</AlertTitle>
        <strong>{state.alertMessage}</strong>
      </Alert>}
    </Layout>
  )
}

export default Users;
