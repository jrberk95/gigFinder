import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = [
  "/", 
  "/user-sessions/new", 
  "/users/new", 
  "/artists",
  "/venues", 
  "/artists/:spotifyArtistId",
  "/venues/new",
  "/venues/:venueId",
  "/venues/:venueId/gigs"
  ];
const authedClientRoutes = ["/profile", "/profile-type-select", "/artist-profile/edit", "/venue-profile/edit"];

router.get(authedClientRoutes, (req, res) => {
  if (req.user) {
    res.sendFile(getClientIndexPath());
  } else {
    res.redirect("/user-sessions/new")
  }
});

router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;
