import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Home, Users } from "./pages";
import { Nav, Footer, Theme } from "./layout";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Api from "./api";


function App() {
  const api = new Api(process.env.REACT_APP_BASE_URL);

  return (
    <MuiThemeProvider theme={Theme}>
      <div className="flex flex-col min-h-screen">
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/">
              <Home api={api} />
            </Route>
            <Route path="/users">
              <Users api={api} />
            </Route>
          </Switch>

          <Footer />
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
