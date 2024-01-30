import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const userData = [
            {
                email: "beane@gmail.com",
                name: "Beane",
                password: "Sympathy",
                primaryLocation: "US",
                spotifyArtistId: "6OPhoP9klTrNJm9EF0FnRt",
                role: "artist"
            },
            {
                email: "blb@gmail.com",
                name: "Blue Light Bandits",
                password: "Sarah",
                primaryLocation: "US",
                spotifyArtistId: "3TqbfOB7nVsw47k3vkL1h6",
                role: "artist"
            },
            {
                email: "goLo@gmail.com",
                name: "Lowell Oakley",
                password: "#GoLo",
                primaryLocation: "US",
                spotifyArtistId: "2DMzW9mjVpFXGMK4Ll6Sjq",
                role: "artist"
            },
            {
                email: "testVenue@gmail.com",
                name: "Anders Borg",
                password: "hairyguy",
                primaryLocation: "US",
                role: "venue"
            },
            {
                email: "elonMusk2023@gmail.com",
                name: "Elon Musk",
                password: "richasheck",
                primaryLocation: "US",
                role: "venue"
            },
            {
                email: "yebba@gmail.com",
                name: "Yebba",
                password: "abbey",
                primaryLocation: "US",
                spotifyArtistId: "1ooV8YZC1KbpEcrmI8WH0F",
                role: "artist"
            },
            {
                email: "thirdstory@gmail.com",
                name: "Thirdstory",
                password: "WhyDidYouBreakUp",
                primaryLocation: "US",
                spotifyArtistId: "7GJbWH8vhhuW22707B8HsW",
                role: "artist"
            },
            {
                email: "dayman@gmail.com",
                name: "Stephen Day",
                password: "dancingInTheStreet",
                primaryLocation: "US",
                spotifyArtistId: "4cnFw4bkIWVGKUBsr93OS5",
                role: "artist"
            },
            {
                email: "newage@gmail.com",
                name: "Knox",
                password: "notthe1975",
                primaryLocation: "US",
                spotifyArtistId: "61S5H9Lxn1PDUvu1TV0kCX",
                role: "artist"
            },
            {
                email: "jordy@gmail.com",
                name: "Jordy Searcy",
                password: "ICanSingHigh",
                primaryLocation: "US",
                spotifyArtistId: "0AV5z1x1RoOGeJWeJzziDz",
                role: "artist"
            },
            {
                email: "carly@gmail.com",
                name: "Carly Bannister",
                password: "noidea",
                primaryLocation: "US",
                spotifyArtistId: "5GoLHATtGcyqwnLMmDRnch",
                role: "artist"
            },
        ]
        
        for (const user of userData) {
            const currentUser = await User.query().findOne({ email: user.email })
            if (!currentUser) {
                await User.query().insert(user)
            }
        }
    }
}

export default UserSeeder