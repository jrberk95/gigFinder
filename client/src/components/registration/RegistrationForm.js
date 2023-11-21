import React, { useState } from "react";
import FormError from "../layout/FormError";
import ErrorList from "../layout/ErrorList"
import translateServerErrors from "../../services/translateServerErrors"

const RegistrationForm = () => {
  
  return (
    <div className="grid-container">
      <h1>Register</h1>
      <h4>Please use Spotify to sign in</h4>
      <a href="/auth/spotify" className="button">Sign in with Spotify</a>
      <p>Because GigFinder uses Spotify data to connect artists and venues, you must have a Spotify account to use our platform. After logging in with your Spotify account, you will be able to choose either an Artist or Venue profile with GigFinder.</p>
      <p>Don't have a Spotify account? Use the link below to sign up!</p>
      <a href="https://www.spotify.com/us/signup">Create a Spotify account</a>
    </div>
  )
}

export default RegistrationForm;