import dotenv from "dotenv";
import User from "../models/User.js";
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import cookieSession from "cookie-session";

dotenv.config();


    const spotifyAuthHandler = (accessToken, refreshToken, expires_in, profile, done) => {
            User.query()
            .findOne({ spotifyUserId: profile?.id })
            .then((user) => {
                // if user logged in before
            if (user) {
                return done(null, user);
            } else {

                // if you look at this log, all of the profile info on this user is available from Google!
                console.log(profile.photos)
    
                // if user hasn't logged in before
                User.query().insertAndFetch({ 
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