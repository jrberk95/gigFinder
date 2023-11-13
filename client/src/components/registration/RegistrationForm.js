import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";
import ErrorList from "../layout/ErrorList"
import translateServerErrors from "../../services/translateServerErrors"

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
    primaryLocation: "",
    spotifyLink: "",
    role: ""
  });

  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    const { email, password, passwordConfirmation, primaryLocation, name, role } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};

    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    if (primaryLocation.trim() == "") {
      newErrors = {
        ...newErrors,
        primaryLocation: "is required",
      };
    }

    if (role.trim() == "") {
      newErrors = {
        ...newErrors,
        role: "is required",
      };
    }

    if (name.trim() == "") {
      newErrors = {
        ...newErrors,
        name: "is required",
      };
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(userPayload)) {
      try {
        if (Object.keys(errors).length === 0) {
          const response = await fetch("/api/v1/users", {
            method: "post",
            body: JSON.stringify(userPayload),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          });
          if (!response.ok) {
            if (response.status === 422) {
              const body = await response.json();
              const newServerErrors = translateServerErrors(body.errors)
              return setServerErrors(newServerErrors)
            }
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
          }
          const userData = await response.json();
          setShouldRedirect(true);
        }
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
    <div className="grid-container">
      <h1>Register</h1>
      <ErrorList errors={serverErrors} />
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <label>
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div>
          <label>
            Venue/Artist Name:
            <input
              type="text"
              name="name"
              value={userPayload.name}
              onChange={onInputChange}
            />
            <FormError error={errors.name} />
          </label>
        </div>
        <div>
          <label>
            Primary location:
            <input
              type="text"
              name="primaryLocation"
              value={userPayload.primaryLocation}
              onChange={onInputChange}
            />
            <FormError error={errors.primaryLocation} />
          </label>
        </div>
        <div>
          <label>
            Spotify artist link:
            <input
              type="text"
              name="spotifyLink"
              value={userPayload.spotifyLink}
              onChange={onInputChange}
            />
            <FormError error={errors.spotifyLink} />
          </label>
        </div>
        <div>
          <label>
            I am...
            <select
              name="role"
              value={userPayload.role}
              onChange={onInputChange}
            >
              <option value=""></option>
              <option value="artist">An artist</option>
              <option value="venue">A venue</option>
            </select>
            <FormError error={errors.role} />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;