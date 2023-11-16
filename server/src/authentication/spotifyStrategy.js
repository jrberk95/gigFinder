import dotenv from "dotenv";
import User from "../models/User.js";
import { Strategy as SpotifyStrategy } from 'passport-spotify';

dotenv.config();

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
                    role: "artist",
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
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/spotify/callback'
    },
    spotifyAuthHandler        
)

export default spotifyStrategy