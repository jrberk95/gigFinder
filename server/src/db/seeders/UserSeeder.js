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
            }
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