import React, { useState } from "react";
import config from "../../config";
import FormError from "../layout/FormError";

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInput = (payload) => {
    setErrors({});
    const { email, password } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(userPayload)) {
      try {
        const response = await fetch("/api/v1/user-sessions", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
        const userData = await response.json();
        setShouldRedirect(true);
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
      }
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="grid-x grid-margin-x" onSubmit={onSubmit}>
      <h1 className="cell page-header">Sign In</h1>
      <h4 className="cell text-center">Use the button below to sign in with Spotify</h4>
      <div className="cell centered">
        <a href="/auth/spotify" className="button-79 profile-button">Sign in with Spotify</a>
      </div>
    </div>
  );
};

export default SignInForm;