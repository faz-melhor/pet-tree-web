import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import { Home, Users, SignIn } from "./pages";
import { Nav, Footer, Theme } from "./layout";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Api from "./api";

function PrivateRoute({ component: Component, api, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        api.Auth.isAuthenticated() ? (
          <Component {...props} api={api} />
        ) : (
          <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
        )
      )}
    />
  );
}

const Main = withRouter(({ location }) => {
  const api = new Api(process.env.REACT_APP_BASE_URL);

  return (
    <>
      {location.pathname !== '/signin' ? <Nav api={api} /> : null}
      <Switch>
        <PrivateRoute exact path="/" component={() => <Home api={api} />} api={api} />
        <PrivateRoute path="/users" component={() => <Users api={api} />} api={api} />
        <Route path="/signin" component={() => <SignIn api={api} />} />
      </Switch>
      {location.pathname !== '/signin' ? <Footer /> : null}
    </>
  );
});

function Routes() {
  return (
    <MuiThemeProvider theme={Theme}>
      <div className="flex flex-col min-h-screen">
        <Router>
          <Main />
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default Routes;
