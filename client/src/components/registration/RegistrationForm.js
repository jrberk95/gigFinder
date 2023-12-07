import React, { useState } from "react";
import FormError from "../layout/FormError";
import ErrorList from "../layout/ErrorList"
import translateServerErrors from "../../services/translateServerErrors"

const RegistrationForm = () => {
  
  return (
    <div className="grid-container grid-x">
      <h1 className="cell page-header">Register</h1>
      <h4 className="cell text-center margin-bottom">Please use Spotify to sign in</h4>
      <div className="cell centered">
        <a href="/auth/spotify" className="button-79 button-smaller margin-bottom">Sign in with Spotify</a>
      </div>
      <p className="text-center">Because GigFinder uses Spotify data to connect artists and venues, you must have a Spotify account to use our platform. After logging in with your Spotify account, you will be able to choose either an Artist or Venue profile with GigFinder.</p>
      <h4 className="cell text-center">Don't have a Spotify account? Use the link below to sign up!</h4>
      <div className="cell centered">
        <a href="https://www.spotify.com/us/signup" className="button-79 button-smaller more-margin">Create a Spotify account</a>
      </div>
    </div>
  )
}

export default RegistrationForm;