import express from "express"
import passport from "passport"

const authSpotifyRouter = new express.Router()

authSpotifyRouter.get('/', passport.authenticate('spotify', { scope: ['user-read-email', 'user-read-private'] }));

authSpotifyRouter.get('/callback', passport.authenticate('spotify', 
    { 
        successRedirect: "/profile-type-select",
        failureRedirect: "/auth/failure"
    })
)

export default authSpotifyRouter