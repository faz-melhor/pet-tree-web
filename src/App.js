import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Home, Users } from "./pages";
import { Nav, Footer, Theme } from "./layout";
import { MuiThemeProvider } from "@material-ui/core/styles";

function App() {
  return (
    <MuiThemeProvider theme={Theme}>
      <div className="flex flex-col min-h-screen">
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
          </Switch>

          <Footer />
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
