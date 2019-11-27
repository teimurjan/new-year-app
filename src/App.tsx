import React from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";

import SignIn from "./sign-in";
import { useAuth } from "./auth/context";
import LoadingLayout from "./loading-layout";
import Navbar from "./navbar";
import Wishlist from "./wishlist";
import WishesToPerform from "./wishes-to-perform";

const App: React.FC = () => {
  const { user, isInitiallyFetched } = useAuth()!;

  const hasUser = Boolean(user);

  return (
    <div className="app">
      <Router>
        {hasUser && <Navbar />}
        {!hasUser && isInitiallyFetched && <Redirect to="/signIn" />}
        <Switch>
          <Route
            render={({ location: { pathname } }) =>
              isInitiallyFetched && hasUser && pathname === "/signIn" ? (
                <Redirect to="/" />
              ) : (
                <SignIn />
              )
            }
            path="/signIn"
            exact
          ></Route>
          <Route path="/wishlist" exact>
            <Wishlist />
          </Route>
          <Route path="/">
            <WishesToPerform />
          </Route>
        </Switch>
        <LoadingLayout in={!isInitiallyFetched} />
      </Router>
    </div>
  );
};

export default App;
