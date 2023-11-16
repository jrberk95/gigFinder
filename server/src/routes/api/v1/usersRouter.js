import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";
import { ValidationError } from "objection";
import got from "got"
import spotifyClient from "../../../apiClient/spotifyClient.js";

const usersRouter = new express.Router();

usersRouter.get("/", async (req, res) => {
  const userId = req.user.id
  const desiredArtist = await User.query().findOne({id: userId})
  const artistId = desiredArtist.spotifyArtistId
  const accessToken = desiredArtist.accessToken

  try {
    const artistData = await spotifyClient.getArtistData(accessToken, artistId)
    return res.status(200).json({ allData: artistData })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error });
  }
})

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

usersRouter.patch("/", async (req, res) => {
  const spotifyArtistId = req.body.spotifyArtistId
  try {
    const existingUser = await User.query().findOne({ id: req.user.id })
    const updatedUser = await existingUser.$query().patchAndFetch({ spotifyArtistId: spotifyArtistId })
    return res.status(200).json({ artist: updatedUser })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
  })

export default usersRouter;