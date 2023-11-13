import express from "express";
import passport from "passport";

import { User } from "../../../models/index.js";
import { ValidationError } from "objection";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, passwordConfirmation, primaryLocation, role, name } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password, primaryLocation, name, role});
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default usersRouter;