import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import AddArtistId from "./layout/AddArtistId";
import AccountDetails from "./layout/AccountDetails";
import ArtistShowPage from "./layout/ArtistShowPage";
import ArtistIndex from "./layout/ArtistIndex";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <h2>Hello from react</h2>
        </Route>
        <Route exact path="/artists" component={ArtistIndex}/>
        <Route 
          exact path="/artists/:spotifyArtistId"
          render={(props) => {
            return <ArtistShowPage user={currentUser} {...props}/>
          }}
        />
        <AuthenticatedRoute exact path="/profile" component={AccountDetails} user={currentUser}/>
        <AuthenticatedRoute exact path="/profile/edit" component={AddArtistId} user={currentUser}/>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  );
};

export default hot(App);
