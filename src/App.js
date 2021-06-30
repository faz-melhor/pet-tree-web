import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Home, Users } from "./pages";
import { Nav, Footer } from "./layout";

function App() {
  return (
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
  );

}

export default App;
