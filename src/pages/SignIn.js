import React, { useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { Button, CssBaseline, TextField, Paper, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from "@material-ui/lab";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Created with ♥️ by faz-melhor.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/featured/?trees)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const { api } = props;
  const history = useHistory();

  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  if (api.Auth.isAuthenticated()) {
    return <Redirect to={{ pathname: "/", state: { from: '/signin' } }} />
  }

  function handleErrorMessage(message) {
    setAlertMessage(message);
    setShowAlert(true);

    const timer = setTimeout(() => {
      setShowAlert(false);
      setAlertMessage('');
    }, 5000);

    return () => clearTimeout(timer);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [ok, result] = await api.Auth.signin(email, password);

    if (ok) {
      history.push('/');
    } else {
      handleErrorMessage(result);
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
            {showAlert && <Alert variant="filled" severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong>{alertMessage}</strong>
            </Alert>}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignIn;
