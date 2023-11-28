import User from "../models/User.js";
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import config from "../config.js";

const spotifyAuthHandler = (accessToken, refreshToken, expires_in, profile, done) => {
        User.query()
        .findOne({ spotifyUserId: profile?.id })
        .then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return User.query().insertAndFetch({ 
                    spotifyUserId: profile.id, 
                    email: profile.emails[0].value, 
                    name: profile.displayName,
                    role: "",
                    primaryLocation: profile.country,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }).then((user) => {
                    return done(null, user);
                })
            }
    });
}

const spotifyStrategy = new SpotifyStrategy (
    {
        clientID: config.spotifyClient.key,
        clientSecret: config.spotifyClientSecret.key,
        callbackURL: config.spotifyCallbackUrl.key
    },
    spotifyAuthHandler        
)

export default spotifyStrategy