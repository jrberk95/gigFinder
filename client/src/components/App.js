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
import LandingPage from "./layout/LandingPage";
import NewVenueForm from "./layout/NewVenueForm";
import VenueShowPage from "./layout/VenueShowPage";
import NewGigForm from "./layout/NewGigForm";
import VenuesByOwner from "./layout/VenuesByOwner";
import VenueIndex from "./layout/VenueIndex";
import AccountTypeSelector from "./layout/AccountTypeSelector";
import VenueAccountEdit from "./layout/VenueAccountEdit";
import GigIndex from "./layout/GigIndex";

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
      <Route 
          exact path="/"
          render={(props) => {
            return <LandingPage user={currentUser} {...props}/>
          }}
        />
        <Route exact path="/artists" component={ArtistIndex}/>
        <Route exact path="/venues" component={VenueIndex}/>
        <Route 
          exact path="/artists/:spotifyArtistId"
          render={(props) => {
            return <ArtistShowPage user={currentUser} {...props}/>
          }}
        />
        <AuthenticatedRoute exact path="/profile" component={AccountDetails} user={currentUser}/>
        <AuthenticatedRoute exact path="/profile-type-select" component={AccountTypeSelector} user={currentUser}/>
        <AuthenticatedRoute exact path="/artist-profile/edit" component={AddArtistId} user={currentUser}/>
        <AuthenticatedRoute exact path="/venue-profile/edit" component={VenueAccountEdit} user={currentUser}/>
        <AuthenticatedRoute exact path="/venues/new" component={NewVenueForm} user={currentUser}/>
        <AuthenticatedRoute exact path="/venues/my-venues" component={VenuesByOwner} user={currentUser}/>
        <AuthenticatedRoute exact path="/venues/:venueId/gigs" component={NewGigForm} user={currentUser}/>
        <AuthenticatedRoute exact path="/gigs" component={GigIndex} user={currentUser}/>
        <Route 
          exact path="/venues/:id"
          render={(props) => {
            return <VenueShowPage user={currentUser} {...props}/>
          }}
        />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  );
};

export default hot(App);
